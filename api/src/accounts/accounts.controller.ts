import {
    Controller,
    Post,
    Body,
    Res,
    UseGuards,
    HttpCode,
    HttpStatus,
} from '@nestjs/common';
import type { Response } from 'express';
import {
    ApiTags,
    ApiOperation,
    ApiResponse,
    ApiCookieAuth,
} from '@nestjs/swagger';
import { AccountsService } from './accounts.service';
import { StartGuestDto } from './dto/start-guest.dto';
import { LinkWalletDto } from './dto/link-wallet.dto';
import { WalletLoginDto } from './dto/wallet-login.dto';
import { UserResponseDto } from './dto/user-response.dto';
import { SessionGuard } from './guards/session.guard';
import { CurrentUser } from './decorators/current-user.decorator';
import type { User } from '@prisma/client';

const COOKIE_MAX_AGE = 180 * 24 * 60 * 60 * 1000; // 180 дней

@ApiTags('accounts')
@Controller({ path: 'accounts', version: '1' })
export class AccountsController {
    constructor(private readonly accountsService: AccountsService) {}

    /**
     * POST /guest/start - Создать гостевую сессию
     */
    @Post('guest/start')
    @HttpCode(HttpStatus.CREATED)
    @ApiOperation({ summary: 'Начать гостевую сессию' })
    @ApiResponse({
        status: 201,
        description: 'Гостевая сессия создана',
        type: UserResponseDto,
    })
    async startGuest(
        @Body() dto: StartGuestDto,
        @Res({ passthrough: true }) res: Response,
    ): Promise<UserResponseDto> {
        const user = await this.accountsService.createGuest(dto.referralCode);

        // Установить HttpOnly cookie
        res.cookie('guestId', user.guestId, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: COOKIE_MAX_AGE,
            signed: true,
        });

        return this.mapToResponse(user);
    }

    /**
     * POST /wallet/link - Привязать кошелёк (апгрейд гостя)
     */
    @Post('wallet/link')
    @UseGuards(SessionGuard)
    @ApiCookieAuth('guestId')
    @ApiOperation({ summary: 'Привязать TON кошелёк к гостевому аккаунту' })
    @ApiResponse({
        status: 200,
        description: 'Кошелёк успешно привязан',
        type: UserResponseDto,
    })
    @ApiResponse({ status: 401, description: 'Неверная подпись' })
    @ApiResponse({ status: 409, description: 'Кошелёк уже занят' })
    async linkWallet(
        @CurrentUser() user: User,
        @Body() dto: LinkWalletDto,
        @Res({ passthrough: true }) res: Response,
    ): Promise<UserResponseDto> {
        const updatedUser = await this.accountsService.linkWallet(user, dto);

        // Защита от session fixation: обновить cookie после апгрейда
        // Удаляем старую гостевую куку
        res.clearCookie('guestId');

        // Создаём новую куку с walletAddress в качестве идентификатора
        res.cookie('walletSession', updatedUser.id, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: COOKIE_MAX_AGE,
            signed: true,
        });

        return this.mapToResponse(updatedUser);
    }

    /**
     * POST /wallet/login - Войти через кошелёк
     */
    @Post('wallet/login')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Войти через TON кошелёк' })
    @ApiResponse({
        status: 200,
        description: 'Успешный вход',
        type: UserResponseDto,
    })
    @ApiResponse({ status: 401, description: 'Неверная подпись или кошелёк не найден' })
    async loginWallet(
        @Body() dto: WalletLoginDto,
        @Res({ passthrough: true }) res: Response,
    ): Promise<UserResponseDto> {
        const user = await this.accountsService.loginWithWallet(dto);

        // Установить session cookie
        res.cookie('walletSession', user.id, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: COOKIE_MAX_AGE,
            signed: true,
        });

        return this.mapToResponse(user);
    }

    /**
     * Маппинг User -> UserResponseDto
     */
    private mapToResponse(user: User): UserResponseDto {
        return {
            id: user.id,
            mode: user.mode,
            guestId: user.guestId ?? undefined,
            walletAddress: user.walletAddress ?? undefined,
            username: user.username ?? undefined,
            avatarUrl: user.avatarUrl ?? undefined,
            progressData: user.progressData,
            createdAt: user.createdAt,
            lastActiveAt: user.lastActiveAt,
        };
    }
}
import {
    Injectable,
    ConflictException,
    UnauthorizedException,
    BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { User, UserMode } from '@prisma/client';
import { nanoid } from 'nanoid';
import { LinkWalletDto } from './dto/link-wallet.dto';
import { WalletLoginDto } from './dto/wallet-login.dto';

@Injectable()
export class AccountsService {
    constructor(private prisma: PrismaService) {}

    /**
     * Создать нового гостевого пользователя
     */
    async createGuest(referralCode?: string): Promise<User> {
        const guestId = `guest_${nanoid(16)}`;

        // TODO: Проверить реферальный код если передан
        if (referralCode) {
            // Логика рефералов будет позже
        }

        const user = await this.prisma.user.create({
            data: {
                mode: UserMode.GUEST,
                guestId,
                progressData: {},
            },
        });

        return user;
    }

    /**
     * Найти пользователя по guestId
     */
    async findByGuestId(guestId: string): Promise<User | null> {
        return this.prisma.user.findUnique({
            where: { guestId },
        });
    }

    /**
     * Найти пользователя по walletAddress
     */
    async findByWallet(walletAddress: string): Promise<User | null> {
        return this.prisma.user.findUnique({
            where: { walletAddress },
        });
    }

    /**
     * Верификация TON подписи (mock для MVP)
     */
    private async verifyTonSignature(
        walletAddress: string,
        message: string,
        signature: string,
    ): Promise<boolean> {
        // TODO: Реальная верификация через @ton/crypto
        // Для MVP возвращаем true если сигнатура не пустая

        if (!signature || signature.length < 10) {
            return false;
        }

        // Mock: проверяем базовый формат
        console.log(`[MOCK] Verifying signature for ${walletAddress}`);
        console.log(`[MOCK] Message: ${message}`);
        console.log(`[MOCK] Signature: ${signature.substring(0, 20)}...`);

        return true; // Mock success
    }

    /**
     * Привязать кошелёк к гостевому аккаунту (апгрейд)
     */
    async linkWallet(
        currentUser: User,
        dto: LinkWalletDto,
    ): Promise<User> {
        // Проверить что пользователь в режиме GUEST
        if (currentUser.mode !== UserMode.GUEST) {
            throw new BadRequestException('Кошелёк уже привязан');
        }

        // Проверить подпись
        const isValid = await this.verifyTonSignature(
            dto.walletAddress,
            dto.message,
            dto.signature,
        );

        if (!isValid) {
            throw new UnauthorizedException('Неверная подпись');
        }

        // Проверить что кошелёк не занят
        const existingWallet = await this.findByWallet(dto.walletAddress);
        if (existingWallet) {
            throw new ConflictException('Этот кошелёк уже привязан к другому аккаунту');
        }

        // Обновить пользователя: апгрейд в WALLET режим
        const updatedUser = await this.prisma.user.update({
            where: { id: currentUser.id },
            data: {
                mode: UserMode.WALLET,
                walletAddress: dto.walletAddress,
                guestId: null, // Удаляем guestId после апгрейда
                lastActiveAt: new Date(),
            },
        });

        return updatedUser;
    }

    /**
     * Войти через кошелёк
     */
    async loginWithWallet(dto: WalletLoginDto): Promise<User> {
        // Проверить подпись
        const isValid = await this.verifyTonSignature(
            dto.walletAddress,
            dto.message,
            dto.signature,
        );

        if (!isValid) {
            throw new UnauthorizedException('Неверная подпись');
        }

        // Найти пользователя
        const user = await this.findByWallet(dto.walletAddress);

        if (!user) {
            throw new UnauthorizedException('Кошелёк не зарегистрирован');
        }

        // Обновить активность
        await this.prisma.user.update({
            where: { id: user.id },
            data: { lastActiveAt: new Date() },
        });

        return user;
    }

    /**
     * Создать новый guestId для rotation после апгрейда
     */
    generateNewGuestId(): string {
        return `guest_${nanoid(16)}`;
    }
}
import {
    Injectable,
    CanActivate,
    ExecutionContext,
    UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class SessionGuard implements CanActivate {
    constructor(private prisma: PrismaService) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest<Request>();
        const guestId = request.signedCookies?.guestId;

        if (!guestId) {
            throw new UnauthorizedException('Сессия не найдена');
        }

        // Найти пользователя по guestId
        const user = await this.prisma.user.findUnique({
            where: { guestId },
        });

        if (!user) {
            throw new UnauthorizedException('Пользователь не найден');
        }

        // Обновить lastActiveAt (скользящая сессия)
        await this.prisma.user.update({
            where: { id: user.id },
            data: { lastActiveAt: new Date() },
        });

        // Прикрепить user к request
        request['user'] = user;

        return true;
    }
}
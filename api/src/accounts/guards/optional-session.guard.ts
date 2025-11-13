import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class OptionalSessionGuard implements CanActivate {
    constructor(private prisma: PrismaService) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest<Request>();
        const guestId = request.signedCookies?.guestId;

        if (guestId) {
            const user = await this.prisma.user.findUnique({
                where: { guestId },
            });

            if (user) {
                await this.prisma.user.update({
                    where: { id: user.id },
                    data: { lastActiveAt: new Date() },
                });
                request['user'] = user;
            }
        }

        return true; // Всегда пропускаем
    }
}
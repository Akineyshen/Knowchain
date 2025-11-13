import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { UserMode } from '@prisma/client';

export class UserResponseDto {
    @ApiProperty({ example: 'clm4g3k5f0000...' })
    id: string;

    @ApiProperty({ enum: UserMode, example: 'GUEST' })
    mode: UserMode;

    @ApiPropertyOptional({ example: 'guest_abc123' })
    guestId?: string;

    @ApiPropertyOptional({ example: 'EQDKbjIcfM6ezt8...' })
    walletAddress?: string;

    @ApiPropertyOptional({ example: 'CryptoMaster' })
    username?: string;

    @ApiPropertyOptional({ example: 'https://example.com/avatar.png' })
    avatarUrl?: string;

    @ApiProperty()
    progressData: any;

    @ApiProperty()
    createdAt: Date;

    @ApiProperty()
    lastActiveAt: Date;
}
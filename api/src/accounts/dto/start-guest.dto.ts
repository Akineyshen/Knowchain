import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class StartGuestDto {
    @ApiPropertyOptional({ description: 'Реферальный код (опционально)' })
    @IsOptional()
    @IsString()
    referralCode?: string;
}
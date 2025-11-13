import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class WalletLoginDto {
    @ApiProperty({
        description: 'TON wallet address',
        example: 'EQDKbjIcfM6ezt8KjKJJLshZJJSqX7XOA4ff-W72r5gqPrHF'
    })
    @IsNotEmpty()
    @IsString()
    walletAddress: string;

    @ApiProperty({
        description: 'Challenge message',
        example: 'Knowchain login: 1699564829'
    })
    @IsNotEmpty()
    @IsString()
    message: string;

    @ApiProperty({
        description: 'Signature (base64)',
        example: 'te6cckEBAQEAVgAA...'
    })
    @IsNotEmpty()
    @IsString()
    signature: string;
}
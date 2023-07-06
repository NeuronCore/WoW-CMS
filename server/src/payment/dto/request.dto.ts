import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsNumber } from 'class-validator';

import { PaymentMethod } from '@/payment/payment.gateway';

export class RequestDto
{
    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    public readonly coinID: number;

    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    public readonly coins: number;

    @ApiProperty()
    @IsEnum(PaymentMethod)
    public readonly paymentMethod: PaymentMethod;
}

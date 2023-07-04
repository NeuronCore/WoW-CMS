import { IsEnum, IsNotEmpty, IsNumber } from 'class-validator';

import { PaymentMethod } from '@/payment/payment.gateway';

export class RequestDto
{
    @IsNumber()
    @IsNotEmpty()
    coinID: number;

    @IsNumber()
    @IsNotEmpty()
    coins: number;

    @IsEnum(PaymentMethod)
    paymentMethod: PaymentMethod;
}

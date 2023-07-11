import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { Request, Response } from 'express';

import { Pool } from 'mysql2/promise';

import { PaymentMethod, ZarinPalGateway } from '@/payment/payment.gateway';

import { RequestDto } from '@/payment/dto/request.dto';

@Injectable()
export class PaymentService
{
    constructor(
        @Inject('AUTH_DATABASE') private authDatabase: Pool,
        @Inject('WEB_DATABASE') private webDatabase: Pool
    )
    { }

    public async request(accountID: number, requestDto: RequestDto, response: Response)
    {
        switch (Object.values(PaymentMethod).join())
        {
            case requestDto.paymentMethod:
                await new ZarinPalGateway(this.authDatabase, this.webDatabase).request(accountID, requestDto, response);
                break;
            default:
                return response.status(HttpStatus.BAD_GATEWAY).json({ statusCode: HttpStatus.BAD_GATEWAY, message: 'Unsupported payment method!' });
        }
    }

    public async verify(request: Request, response: Response)
    {
        switch (Object.values(PaymentMethod).join())
        {
            case request.query.gateway:
                await new ZarinPalGateway(this.authDatabase, this.webDatabase).verify(request, response);
                break;
            default:
                return response.status(HttpStatus.BAD_GATEWAY).json({ statusCode: HttpStatus.BAD_GATEWAY, message: 'Unsupported payment method!' });
        }
    }
}

import { Body, Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { Response, Request } from 'express';

import { AccountDecorator } from '@/account/account.decorator';

import { AuthGuard } from '@/auth/auth.guard';

import { PaymentService } from './payment.service';

import { RequestDto } from '@/payment/dto/request.dto';

@Controller('payment')
export class PaymentController
{
    constructor(private readonly paymentService: PaymentService)
    { }

    @Post('request')
    @UseGuards(AuthGuard)
    public async request(@AccountDecorator() accountID: number, @Body() requestDto: RequestDto, @Res() response: Response)
    {
        return this.paymentService.request(accountID, requestDto, response);
    }

    @Get('verify')
    public async verify(@Req() request: Request, @Res() response: Response)
    {
        return this.paymentService.verify(request, response);
    }
}

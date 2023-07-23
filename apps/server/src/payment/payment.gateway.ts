import { BadRequestException, HttpStatus, Logger } from '@nestjs/common';
import { Request, Response } from 'express';
import { Pool } from 'mysql2/promise';
import axios from 'axios';

import { RequestDto } from '@/payment/dto/request.dto';

export abstract class PaymentGateway
{
    abstract request(accountID: number, requestDto: RequestDto, response: Response);
    abstract verify(request: Request, response: Response);
}

export class ZarinPalGateway implements PaymentGateway
{
    constructor(private webDatabase: Pool)
    { }

    public async request(accountID: number, requestDto: RequestDto, response: Response)
    {
        const { coinID, coins } = requestDto;

        const [coin] = await this.webDatabase.query('SELECT `id`, `rial`, `count` FROM `coins` WHERE `id` = ?', [coinID]);

        if (coin[0]?.count <= 0 || coins <= 0)
            throw new BadRequestException('You must buy at least 1 coin');

        const options =
        {
            merchant_id: process.env.ZARINPAL_MERCHANT_ID,
            amount: (coin[0].rial * coin[0].count) * coins,
            callback_url: `${ process.env.SERVER_IP_OR_URL }/${ process.env.ZARINPAL_CALLBACK }?gateway=${ PaymentMethod.ZARIN_PAL_GATEWAY }`,
            description: `To buy ${ coin[0].count * coins } coins`
        };

        try
        {
            const { data: { data: { code, authority } } } = await axios.post(process.env.ZARINPAL_REQUEST, options);

            if (code === 100 && authority)
            {
                await this.webDatabase.execute
                (
                    'INSERT INTO `payments` (`account`, `coins`, `gateway`, `verify`, `amount`, `authority`, `description`) VALUES (?, ?, ?, ?, ?, ?, ?)',
                    [accountID, coin[0].count * coins, PaymentMethod.ZARIN_PAL_GATEWAY, 0, options.amount, authority, options.description]
                );

                return response.status(HttpStatus.OK).json({ statusCode: HttpStatus.OK, data: { gateway: `${ process.env.ZARINPAL_GATEWAY }/${ authority }`, code } });
            }
        }
        catch (exception)
        {
            Logger.error(`${ response.statusMessage } ${ response.statusCode }`, null, 'PaymentGateway');
        }
    }

    public async verify(request: Request, response: Response)
    {
        const { Authority } = request.query;

        try
        {
            const [payment] = await this.webDatabase.query('SELECT `account`, `coins`, `verify`, `amount` ,`authority` FROM `payments` WHERE `verify` = ? AND `authority` = ?', [0, Authority]);

            if (!payment[0])
                return response.status(HttpStatus.NOT_FOUND).json({ statusCode: HttpStatus.NOT_FOUND, message: 'Pending payment transaction not found' });

            if (payment[0].verify === 1)
                return response.status(HttpStatus.BAD_REQUEST).json({ statusCode: HttpStatus.BAD_REQUEST, message: 'The desired transaction has already been paid' });

            const verifyResult = await fetch(process.env.ZARINPAL_VERIFY, {
                method: 'POST',
                body: JSON.stringify({ merchant_id: process.env.ZARINPAL_MERCHANT_ID, amount: payment[0].amount, authority: Authority }),
                headers: { 'Content-Type': 'application/json' }
            }).then(result => result.json());

            const { code, ref_id, card_hash } = verifyResult.data;

            if (code === 100)
            {
                await this.webDatabase.execute('UPDATE `payments` SET `verify` = ?, `ref_id` = ?, `card_hash` = ? WHERE `authority` = ?', [1, ref_id, card_hash, Authority]);

                const [accountInformation] = await this.webDatabase.query('SELECT `id`, `coins` FROM `account_information` WHERE `id` = ?', [payment[0].account]);
                await this.webDatabase.execute('UPDATE `account_information` SET `coins` = ? WHERE `id` = ?', [accountInformation[0].coins + payment[0].coins, accountInformation[0].id]);

                return response.status(HttpStatus.OK).json({ statusCode: HttpStatus.OK, message: 'Your payment has been successfully completed', data: { verifyResult } });
            }

            return response.status(HttpStatus.BAD_REQUEST).json({ statusCode: HttpStatus.BAD_REQUEST, message: 'Your payment was not successful' });
        }
        catch (exception)
        {
            Logger.error(`${ exception }`, null, 'PaymentGateway');
        }
    }
}

export enum PaymentMethod
{
    ZARIN_PAL_GATEWAY = 'ZarinPalGateway',
}

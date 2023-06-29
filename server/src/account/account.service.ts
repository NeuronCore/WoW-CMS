import { BadRequestException, HttpStatus, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { Response } from 'express';
import { Pool } from 'mysql2/promise';

import { Helper } from '@/utils/helper.util';
import { SRP6 } from '@/utils/SRP6.util';

import { UpdatePasswordDto } from './dto/update-password.dto';

@Injectable()
export class AccountService
{
    constructor(
        @Inject('AUTH_DATABASE') private authDatabase: Pool,
        @Inject('WEB_DATABASE') private webDatabase: Pool
    )
    { }

    public async current(accountID: number)
    {
        const [account] = await this.authDatabase.query('SELECT `username`, `email`, `joindate`, `last_ip`, `locked`, `last_login`, `online`, `os`, `totaltime` FROM `account` WHERE `id` = ?', [accountID]);
        const [accountInformation] = await this.webDatabase.query('SELECT `first_name`, `last_name`, `phone` FROM `account_information` WHERE `id` = ?', [accountID]);

        const information = Object.assign(account[0], accountInformation[0]);

        return { statusCode: HttpStatus.OK, data: { information } };
    }

    public async updatePassword(accountID: number, updatePasswordDto: UpdatePasswordDto, response: Response)
    {
        const { currentPassword, newPassword, newPasswordConfirm } = updatePasswordDto;

        const [account] = await this.authDatabase.query('SELECT `id`, `username`, `salt`, `verifier` FROM `account` WHERE `id` = ?', [accountID]);
        if (!account[0])
            throw new BadRequestException('Account does not exist');

        if (!SRP6.verifySRP6(account[0]?.username, currentPassword, account[0]?.salt, account[0]?.verifier))
            throw new UnauthorizedException('Current password is incorrect');

        if (newPassword !== newPasswordConfirm)
            throw new BadRequestException('New password does not match');

        const verifier = SRP6.calculateSRP6Verifier(account[0].username, newPassword, account[0].salt);
        await this.authDatabase.execute('UPDATE `account` SET `verifier` = ? WHERE `id` = ?', [verifier, account[0].id]);

        await Helper.generateAndSetToken(account, response, this.webDatabase, 'Password updated successfully');
    }
}

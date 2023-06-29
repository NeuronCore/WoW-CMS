import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { Pool } from 'mysql2/promise';

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
}

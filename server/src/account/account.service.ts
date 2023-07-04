import * as path from 'path';

import { BadRequestException, HttpStatus, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { Response } from 'express';
import { Pool } from 'mysql2/promise';

import * as sharp from 'sharp';

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
        const [accountInformation] = await this.webDatabase.query('SELECT `first_name`, `last_name`, `phone`, `avatar`, `coins` FROM `account_information` WHERE `id` = ?', [accountID]);

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
        await this.authDatabase.execute('UPDATE `account` SET `verifier` = ? WHERE `id` = ?', [verifier, accountID]);

        await this.webDatabase.execute('REPLACE INTO `account_password` (`id`, `password_changed_at`) VALUES (?, ?)', [accountID, new Date(Date.now() - 1000)]);

        await Helper.generateAndSetToken(account, response, this.webDatabase, 'Password updated successfully');
    }

    public async updateAvatar(accountID: number, avatar: Express.Multer.File)
    {
        try
        {
            const originalName = path.parse(avatar.originalname).name;
            const filename = accountID + '-' + 'avatar' + '-' + Date.now() + '-' + originalName + '.jpg';

            await sharp(avatar.buffer).resize(400, 400).toFile(path.join('uploads/avatar', filename));

            await this.webDatabase.execute('UPDATE `account_information` SET `avatar` = ? WHERE `id` = ?', [filename, accountID]);

            return { statusCode: HttpStatus.OK, data: filename };
        }
        catch (exception)
        {
            throw new BadRequestException('You are only allowed to upload images');
        }
    }
}

import * as path from 'path';

import { BadRequestException, ConflictException, HttpStatus, Inject, Injectable, InternalServerErrorException, Logger, UnauthorizedException } from '@nestjs/common';
import { Response } from 'express';
import { Pool } from 'mysql2/promise';

import * as sharp from 'sharp';

import { Helper } from '@/utils/helper.util';
import { SRP6 } from '@/utils/SRP6.util';

import { UpdatePasswordDto } from './dto/update-password.dto';
import { UpdateInformationDto } from '@/account/dto/update-information.dto';
import { UpdateEmailDto } from '@/account/dto/update-email.dto';

@Injectable()
export class AccountService
{
    private logger: Logger = new Logger(AccountService.name);

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

    /**
     *
     * @param accountID
     * @param updatePasswordDto
     * @param response
     *
     * @description
     *      code:
     *          1002 - Must be longer than or equal to 8 and shorter than or equal to 30 characters
     *          1005 - Should not be empty
     *          2011 - Account does not exist
     *          2012 - Current password is incorrect
     *          2013 - New password does not match
     *          2014 - Your Password updated successfully
     */
    public async updatePassword(accountID: number, updatePasswordDto: UpdatePasswordDto, response: Response)
    {
        const { currentPassword, newPassword, newConfirmPassword } = updatePasswordDto;

        const [account] = await this.authDatabase.query('SELECT `id`, `username`, `salt`, `verifier` FROM `account` WHERE `id` = ?', [accountID]);
        if (!account[0])
            throw new BadRequestException([{ field: 'all', code: '2011' }]);

        if (!SRP6.verifySRP6(account[0]?.username, currentPassword, account[0]?.salt, account[0]?.verifier))
            throw new UnauthorizedException([{ field: 'currentPassword', code: '2012' }]);

        if (newPassword !== newConfirmPassword)
            throw new BadRequestException([{ field: 'newConfirmPassword', code: '2013' }]);

        const verifier = SRP6.calculateSRP6Verifier(account[0].username, newPassword, account[0].salt);
        await this.authDatabase.execute('UPDATE `account` SET `verifier` = ? WHERE `id` = ?', [verifier, accountID]);

        await this.webDatabase.execute('REPLACE INTO `account_password` (`id`, `password_changed_at`) VALUES (?, ?)', [accountID, new Date(Date.now() - 1000)]);

        const accessToken = await Helper.generateAndSetToken(account, response, this.webDatabase);

        return { statusCode: HttpStatus.OK, message: [{ field: 'successfully', code: '2014' }], data: { accessToken } };
    }

    /**
     *
     * @param accountID
     * @param avatar
     *
     * @description
     *      code:
     *          2015 - Avatar updated successfully
     *          2016 - You are only allowed to upload images
     */
    public async updateAvatar(accountID: number, avatar: Express.Multer.File)
    {
        try
        {
            const originalName = path.parse(avatar.originalname).name;
            const filename = accountID + '-' + 'avatar' + '-' + Date.now() + '-' + originalName + '.jpg';

            await sharp(avatar.buffer).resize(400, 400).toFile(path.join('uploads/avatar', filename));

            await this.webDatabase.execute('UPDATE `account_information` SET `avatar` = ? WHERE `id` = ?', [filename, accountID]);

            return { statusCode: HttpStatus.OK, message: [{ field: 'successfully', code: '2015' }] };
        }
        catch (exception)
        {
            throw new BadRequestException([{ field: 'all', code: '2016' }]);
        }
    }

    /**
     *
     * @param accountID
     * @param updateInformationDto
     *
     * @description
     *      code:
     *          1003 - Must be longer than or equal to 1 and shorter than or equal to 50 characters
     *          2017 - Information updated successfully
     */
    public async updateInformation(accountID: number, updateInformationDto: UpdateInformationDto)
    {
        try
        {
            const { firstName, lastName, phone } = updateInformationDto;

            const [accountInformation] = await this.webDatabase.query('SELECT `first_name`, `last_name`, `phone` FROM `account_information` WHERE `id` = ?', [accountID]);

            await this.webDatabase.execute('UPDATE `account_information` SET `first_name` = ?, `last_name` = ?, `phone` = ? WHERE `id` = ?', [firstName || accountInformation[0].first_name, lastName || accountInformation[0].last_name, phone || accountInformation[0].phone, accountID]);

            return { statusCode: HttpStatus.OK, message: [{ field: 'successfully', code: '2017' }] };
        }
        catch (exception)
        {
            this.logger.error(exception);

            if (exception)
                throw new InternalServerErrorException('There was an error sending the update information. Try again later!');
        }
    }

    /**
     *
     * @param accountID
     * @param updateEmailDto
     *
     * @description
     *      code:
     *          1001 - Must be an email
     *          1005 - Should not be empty
     *          2000 - Email address already exists
     *          2012 - Current password is incorrect
     *          2018 - The Email updated successfully
     */
    public async updateEmail(accountID: number, updateEmailDto: UpdateEmailDto)
    {
        const { email, currentPassword } = updateEmailDto;

        const [account] = await this.authDatabase.query('SELECT `email`, `reg_mail`, `salt`, `verifier` FROM `account` WHERE `id` = ?', [accountID]);
        if (account[0]?.email)
            throw new ConflictException([{ field: 'email', code: '2000' }]);

        if (!SRP6.verifySRP6(account[0]?.username, currentPassword, account[0]?.salt, account[0]?.verifier))
            throw new UnauthorizedException([{ field: 'currentPassword', code: '2012' }]);

        await this.webDatabase.execute('UPDATE `account` SET `email` = ?, `reg_mail` = ? WHERE `id` = ?', [email, email, accountID]);

        return { statusCode: HttpStatus.OK, message: [{ field: 'successfully', code: '2018' }] };
    }
}

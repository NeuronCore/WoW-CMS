import { createHash, randomBytes } from 'crypto';

import { BadRequestException, HttpStatus, Inject, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { Pool } from 'mysql2/promise';

import { Email } from '../utils/email.util';
import { SRP6 } from '../utils/SRP6.util';

import { UpdateResetPasswordDto } from './dto/update-reset-password.dto';

@Injectable()
export class AccountPasswordService
{
    constructor(
        @Inject('AUTH_DATABASE') private authDatabase: Pool,
        @Inject('WEB_DATABASE') private webDatabase: Pool
    )
    { }

    public async forgotPassword(email: string)
    {
        if (!email)
            throw new BadRequestException('Email is required');

        const [account] = await this.authDatabase.query('SELECT `id`, `email` FROM `account` WHERE `email` = ?', [email]);
        if (!account[0])
            throw new NotFoundException('There is no account with this email address');

        const resetToken: string = randomBytes(32).toString('hex');
        const passwordResetExpires: any = new Date(Date.now() + 10 * 60 * 1000);
        const passwordResetToken: string = createHash('sha256').update(resetToken).digest('hex');

        await this.webDatabase.execute('REPLACE INTO `account_password` (`id`, `password_reset_expires`, `password_reset_token`) VALUES (?, ?, ?)', [account[0].id, passwordResetExpires, passwordResetToken]);

        try
        {
            const resetURL = `${ process.env.RESET_PASSWORD_URL }${ resetToken }`;
            await new Email(account, resetURL).sendPasswordReset();
            return { statusCode: HttpStatus.OK, message: 'Token sent to email' };
        }
        catch (error)
        {
            await this.webDatabase.execute('DELETE FROM `account_password` WHERE `id` = ?', [account[0].id]);
            console.log(error);
            if (error)
                throw new InternalServerErrorException('There was an error sending the email. Try again later!');
        }
    }

    public async resetPassword(updateResetPasswordDto: UpdateResetPasswordDto, token: string): Promise<object>
    {
        const { password, passwordConfirm } = updateResetPasswordDto;

        const hashedToken: string = createHash('sha256').update(token).digest('hex');

        const [accountPassword] = await this.webDatabase.query('SELECT `id`, `password_changed_at`, `password_reset_expires`, `password_reset_token` FROM `account_password` WHERE `password_reset_token` = ? AND `password_reset_expires` > ?', [hashedToken, new Date()]);
        if (!accountPassword[0])
            throw new BadRequestException('Token is invalid or has expired');

        if (passwordConfirm !== password)
            throw new BadRequestException('Password does not match');

        const [account] = await this.authDatabase.query('SELECT `id`, `username`, `salt` FROM `account` WHERE `id` = ?', [accountPassword[0].id]);

        const verifier = SRP6.calculateSRP6Verifier(account[0].username, password, account[0].salt);
        await this.authDatabase.execute('UPDATE `account` SET `verifier` = ? WHERE `id` = ?', [verifier, account[0].id]);

        await this.webDatabase.execute('UPDATE `account_password` SET `password_changed_at` = ?, `password_reset_expires` = NULL, `password_reset_token` = NULL WHERE `id` = ?', [new Date(Date.now() - 1000), account[0].id]);

        return { statusCode: HttpStatus.OK, message: 'Your password has been reset successfully!' };
    }
}

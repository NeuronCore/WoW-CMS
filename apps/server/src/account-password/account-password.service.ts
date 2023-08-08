import { createHash, randomBytes } from 'crypto';

import { BadRequestException, HttpStatus, Inject, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { Pool } from 'mysql2/promise';

import { Email } from '@/utils/email.util';
import { SRP6 } from '@/utils/SRP6.util';

import { UpdateResetPasswordDto } from './dto/update-reset-password.dto';

@Injectable()
export class AccountPasswordService
{
    private logger: Logger = new Logger(AccountPasswordService.name);

    constructor(
        @Inject('AUTH_DATABASE') private authDatabase: Pool,
        @Inject('WEB_DATABASE') private webDatabase: Pool
    )
    { }

    /**
     *
     * @param email
     *
     * @description
     *      code:
     *          1005 - Should not be empty
     *          2019 - There is no account with this email address
     *          2020 - Token sent to email
     */
    public async forgotPassword(email: string)
    {
        if (!email)
            throw new BadRequestException([{ field: 'email', code: '1005' }]);

        const [account] = await this.authDatabase.query('SELECT `id`, `email` FROM `account` WHERE `email` = ?', [email]);
        if (!account[0])
            throw new NotFoundException([{ field: 'email', code: '2019' }]);

        const resetToken: string = randomBytes(32).toString('hex');
        const passwordResetExpires: Date = new Date(Date.now() + 10 * 60 * 1000);
        const passwordResetToken: string = createHash('sha256').update(resetToken).digest('hex');

        await this.webDatabase.execute('REPLACE INTO `account_password` (`id`, `password_reset_expires`, `password_reset_token`) VALUES (?, ?, ?)', [account[0].id, passwordResetExpires, passwordResetToken]);

        try
        {
            const resetURL = `${ process.env.CLIENT_IP_OR_URL }/${ process.env.RESET_PASSWORD_URL }/${ resetToken }`;
            await new Email(account, resetURL).sendPasswordReset();
            return { statusCode: HttpStatus.OK, message: [{ field: 'successfully', code: '2020' }] };
        }
        catch (exception)
        {
            await this.webDatabase.execute('DELETE FROM `account_password` WHERE `id` = ?', [account[0].id]);

            this.logger.error(exception);

            if (exception)
                throw new InternalServerErrorException('There was an error sending the email. Try again later!');
        }
    }

    /**
     *
     * @param updateResetPasswordDto
     * @param token
     *
     * @description
     *      code:
     *          1002 - Must be longer than or equal to 8 and shorter than or equal to 30 characters
     *          2002 - Password does not match
     *          2021 - Token is invalid or has expired
     *          2022 - Your password has been reset successfully!
     */
    public async resetPassword(updateResetPasswordDto: UpdateResetPasswordDto, token: string): Promise<object>
    {
        const { password, confirmPassword } = updateResetPasswordDto;

        const hashedToken: string = createHash('sha256').update(token).digest('hex');

        const [accountPassword] = await this.webDatabase.query('SELECT `id`, `password_changed_at`, `password_reset_expires`, `password_reset_token` FROM `account_password` WHERE `password_reset_token` = ? AND `password_reset_expires` > ?', [hashedToken, new Date()]);
        if (!accountPassword[0])
            throw new BadRequestException([{ field: 'all', code: '2021' }]);

        if (confirmPassword !== password)
            throw new BadRequestException([{ field: 'all', code: '2002' }]);

        const [account] = await this.authDatabase.query('SELECT `id`, `username`, `salt` FROM `account` WHERE `id` = ?', [accountPassword[0].id]);

        const verifier = SRP6.calculateSRP6Verifier(account[0].username, password, account[0].salt);
        await this.authDatabase.execute('UPDATE `account` SET `verifier` = ? WHERE `id` = ?', [verifier, account[0].id]);

        await this.webDatabase.execute('UPDATE `account_password` SET `password_changed_at` = ?, `password_reset_expires` = NULL, `password_reset_token` = NULL WHERE `id` = ?', [new Date(Date.now() - 1000), account[0].id]);

        return { statusCode: HttpStatus.OK, message: [{ field: 'successfully', code: '2022' }] };
    }
}

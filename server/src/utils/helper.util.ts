import { Response } from 'express';
import { sign } from 'jsonwebtoken';
import { Pool } from 'mysql2/promise';

export class Helper
{
    public static async generateAndSetToken(account: unknown, response: Response, webDatabase: Pool)
    {
        const accessToken: string = sign({ id: account[0].id }, process.env.JWT_ACCESS_KEY, { expiresIn: process.env.JWT_ACCESS_EXPIRES_IN });
        const refreshToken: string = sign({ id: account[0].id }, process.env.JWT_REFRESH_KEY, { expiresIn: process.env.JWT_REFRESH_EXPIRES_IN });

        await webDatabase.execute('UPDATE `account_information` SET `refresh_token` = ? WHERE `id` = ?', [refreshToken, account[0].id]);

        response.cookie('refreshToken', refreshToken, { httpOnly: true, maxAge: +process.env.JWT_REFRESH_COOKIE_MAX_AGE });

        return accessToken;
    }

    public static stringToSlug(str: string): string
    {
        if (str === '' || str === undefined || str === null)
            return;

        str = str.replace(/^\s+|\s+$/g, '');
        str = str.toLowerCase();

        // remove accents, swap ñ for n, etc
        const from = 'àáäâèéëêìíïîòóöôùúüûñç·/_,:;';
        const to   = 'aaaaeeeeiiiioooouuuunc------';

        for (let i = 0, l = from.length; i < l; i++)
            str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));

        str = str.replace(/[^a-z0-9 -]/g, '') // remove invalid chars
            .replace(/\s+/g, '-') // collapse whitespace and replace by -
            .replace(/-+/g, '-'); // collapse dashes

        return str;
    }
}

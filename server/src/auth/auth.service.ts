import { BadRequestException, ConflictException, HttpStatus, Inject, Injectable, UnauthorizedException }  from '@nestjs/common';
import { Pool } from 'mysql2/promise';
import { Response, Request } from 'express';
import { sign, verify } from 'jsonwebtoken';

import { SRP6 } from '@/utils/SRP6.util';
import { Helper } from '@/utils/helper.util';

import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService
{
    constructor(
        @Inject('AUTH_DATABASE') private authDatabase: Pool,
        @Inject('WEB_DATABASE') private webDatabase: Pool
    )
    { }

    public async register(registerDto: RegisterDto)
    {
        const { firstName, lastName, username, email, password, passwordConfirm } = registerDto;

        const [emailExists] = await this.authDatabase.query('SELECT `email` FROM `account` WHERE `email` = ?', [email]);

        if (emailExists[0]?.email)
            throw new ConflictException('Email address already exists');

        const [usernameExists] = await this.authDatabase.query('SELECT `username` FROM `account` WHERE `username` = ?', [username]);
        if (usernameExists[0]?.username)
            throw new ConflictException('This Username already exists');

        if (passwordConfirm !== password)
            throw new BadRequestException('Password does not match');

        const [salt, verifier] = SRP6.GetSRP6RegistrationData(username, password);

        await this.authDatabase.execute('INSERT INTO `account` (`username`, `salt`, `verifier`, `email`, `reg_mail`) VALUES (?, ?, ?, ?, ?)', [username.toUpperCase(), salt, verifier, email.toUpperCase(), email.toUpperCase()]);

        const [accountID] = await this.authDatabase.query('SELECT `id` FROM `account` WHERE `username` = ?', [username]);

        await this.webDatabase.execute('INSERT INTO `account_information` (`id`, `first_name`, `last_name`) VALUES (?, ?, ?)', [accountID[0].id, firstName, lastName]);

        return { statusCode: HttpStatus.OK, message: 'Account created successfully' };
    }

    public async login(loginDto: LoginDto, response: Response)
    {
        const { username, password } = loginDto;
        const [account] = await this.authDatabase.query('SELECT `id`, `salt`, `verifier` FROM `account` WHERE `username` = ?', [username]);

        if (!account[0] || !SRP6.verifySRP6(username, password, account[0]?.salt, account[0]?.verifier))
            throw new UnauthorizedException('Incorrect username or password');

        await Helper.generateAndSetToken(account, response, this.webDatabase, 'You\'re logged in successfully');
    }

    public async logout(request: Request, response: Response)
    {
        const refreshToken: string = request.cookies.refreshToken;
        if (!refreshToken)
            throw new UnauthorizedException('You are not logged in! Please log in to get access.');

        const [account] = await this.webDatabase.query('SELECT `id`, `refresh_token` FROM `account_information` WHERE `refresh_token` = ?', [refreshToken]);
        if (!account[0])
            Helper.clearCookies(response);

        await this.webDatabase.execute('UPDATE `account_information` SET `refresh_token` = NULL WHERE `id` = ?', [account[0].id]);

        Helper.clearCookies(response);
    }

    public async refresh(request: Request)
    {
        const refreshToken: string = request.cookies.refreshToken;
        if (!refreshToken)
            throw new UnauthorizedException('You are not logged in! Please log in to get access.');

        const [account] = await this.webDatabase.query('SELECT `id`, `refresh_token` FROM `account_information` WHERE `refresh_token` = ?', [refreshToken]);
        if (!account[0])
            throw new UnauthorizedException('Invalid Token. Please log in again!');

        const verifyRefreshToken: any = verify(refreshToken, process.env.JWT_REFRESH_KEY);
        if (!verifyRefreshToken || account[0]?.id !== verifyRefreshToken.id)
            throw new UnauthorizedException('Invalid Token. Please log in again!');

        const accessToken: string = sign({ id: account[0].id }, process.env.JWT_ACCESS_KEY, { expiresIn: process.env.JWT_ACCESS_EXPIRES_IN });
        return { statusCode: HttpStatus.OK, data: accessToken };
    }
}

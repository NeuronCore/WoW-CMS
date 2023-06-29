import { CanActivate, ExecutionContext, Inject, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { verify } from 'jsonwebtoken';
import { Pool } from 'mysql2/promise';

@Injectable()
export class AuthGuard implements CanActivate
{
    private decoded: any;

    constructor(@Inject('AUTH_DATABASE') private authDatabase: Pool)
    { }

    async canActivate(context: ExecutionContext): Promise<boolean>
    {
        const request = context.switchToHttp().getRequest();

        let token: string;

        if (request.headers.authorization && request.headers.authorization.startsWith('WoW-CMS'))
            token = request.headers.authorization.split(' ')[1];
        else
            token = request.cookies.accessToken;

        if (!token)
            throw new UnauthorizedException('You are not logged in! Please log in to get access.');

        try
        {
            this.decoded = verify(token, process.env.JWT_ACCESS_KEY);
        }
        catch (error)
        {
            if (error.name === 'JsonWebTokenError' || this.decoded === undefined)
                throw new UnauthorizedException('Invalid Token. Please log in again!');

            if (error.name === 'TokenExpiredError')
                throw new UnauthorizedException('Your token has expired! Please log in again');

            if (error)
                throw new InternalServerErrorException('Something went wrong! Please try again later');
        }

        const [accountExists] = await this.authDatabase.query('SELECT `id` FROM `account` WHERE `id` = ?', [this.decoded.id]);
        if (!accountExists)
            throw new UnauthorizedException('The account belonging to this token no longer exists.');

        request.account = this.decoded.id;

        return true;
    }
}

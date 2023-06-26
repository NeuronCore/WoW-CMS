import { BadRequestException, ConflictException, Inject, Injectable } from '@nestjs/common';
import { Pool } from 'mysql2/promise';

import { SRP6 } from '../utils/SRP6.util';

import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService
{
    constructor(@Inject('AUTH_DATABASE') private authDatabase: Pool)
    { }

    public async register(registerDto: RegisterDto)
    {
        const { firstName, lastName, username, email, password, passwordConfirm } = registerDto;

        const [emailExists] = await this.authDatabase.execute('SELECT `email` FROM `account` WHERE `email` = ?', [email]);

        if (emailExists[0]?.email)
            throw new ConflictException('Email address already exists');

        const [usernameExists] = await this.authDatabase.execute('SELECT `username` FROM `account` WHERE `username` = ?', [username]);
        if (usernameExists[0]?.username)
            throw new ConflictException('This Username already exists');

        if (passwordConfirm !== password)
            throw new BadRequestException('Password does not match');

        const [salt, verifier] = SRP6.GetSRP6RegistrationData(username, password);

        await this.authDatabase.execute('INSERT INTO `account` (`username`, `salt`, `verifier`, `email`, `reg_mail`) VALUES (?, ?, ?, ?, ?)', [username.toUpperCase(), salt, verifier, email.toUpperCase(), email.toUpperCase()]);
        console.log(test);
    }
}

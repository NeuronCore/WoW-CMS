import { Inject, Injectable } from '@nestjs/common';
import { Pool } from 'mysql2/promise';

@Injectable()
export class AuthService
{
    constructor(
        @Inject('AUTH_DATABASE') private authDatabase: Pool,
        @Inject('CHARACTERS_DATABASE') private characterDatabase: Pool,
    )
    {}

    async create()
    {
        const [row] = await this.characterDatabase['Hello'].query('select * from city');
        console.log(row);
    }
}

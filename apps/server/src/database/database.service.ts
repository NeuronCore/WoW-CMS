import { BadRequestException, HttpStatus, Inject, Injectable } from '@nestjs/common';

import { Pool } from 'mysql2/promise';

@Injectable()
export class DatabaseService
{
    constructor(@Inject('CHARACTERS_DATABASE') private charactersDatabase: Pool)
    {

    }

    public getRealms()
    {
        const realms = Object.keys(this.charactersDatabase);

        return { statusCode: HttpStatus.OK, data: { realms } };
    }

    public async getRealmLevel(realm: string)
    {
        const charactersDatabase = this.charactersDatabase[realm];
        if (!charactersDatabase)
            throw new BadRequestException('A realm with this name doesn\'t exist');

        const level = this.charactersDatabase[realm].realmLevel;

        return { statusCode: HttpStatus.OK, data: { level } };
    }
}

import { HttpStatus, Inject, Injectable } from '@nestjs/common';

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
}

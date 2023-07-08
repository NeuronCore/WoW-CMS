import { Controller, Get } from '@nestjs/common';

import { DatabaseService } from './database.service';

@Controller('database')
export class DatabaseController
{
    constructor(private readonly databaseService: DatabaseService)
    {

    }

    @Get('realms')
    public async getRealms()
    {
        return this.databaseService.getRealms();
    }
}

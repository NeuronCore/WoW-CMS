import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { DatabaseService } from './database.service';

@Controller('database')
@ApiTags('Database')
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

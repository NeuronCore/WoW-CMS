import { Controller, Get, Param } from '@nestjs/common';
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

    @Get('realm-level/realm/:realm')
    public async getRealmLevel(@Param('realm') realm: string)
    {
        return this.databaseService.getRealmLevel(realm);
    }
}

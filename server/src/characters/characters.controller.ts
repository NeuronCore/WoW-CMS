import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { CharactersService } from './characters.service';

@Controller('characters')
@ApiTags('Characters')
export class CharactersController
{
    constructor(private readonly charactersService: CharactersService)
    {

    }

    @Get('realm/:realm/arena-team/type/:type')
    public async getArenaTeamByType(@Param('realm') realm: string, @Param('type') type: number, @Query('page') page: number, @Query('limit') limit: number)
    {
        return this.charactersService.getArenaTeamByType(realm, type, page, limit);
    }

    @Get('realm/:realm/arena-team/id/:id')
    public async getArenaTeamById(@Param('realm') realm: string, @Param('id') id: number, @Query('page') page: number, @Query('limit') limit: number)
    {
        return this.charactersService.getArenaTeamById(realm, id, page, limit);
    }

    @Get('realm/:realm/arena-team-member/id/:id')
    public async getArenaTeamMember(@Param('realm') realm: string, @Param('id') id: number, @Query('page') page: number, @Query('limit') limit: number)
    {
        return this.charactersService.getArenaTeamMember(realm, id, page, limit);
    }

    @Get('realm/:realm/top-killers')
    public async getTopKillers(@Param('realm') realm: string, @Query('page') page: number, @Query('limit') limit: number)
    {
        return this.charactersService.getTopKillers(realm, page, limit);
    }

    @Get('realm/:realm/top-achievements')
    public async getTopAchievements(@Param('realm') realm: string, @Query('page') page: number, @Query('limit') limit: number)
    {
        return this.charactersService.getTopAchievements(realm, page, limit);
    }
}

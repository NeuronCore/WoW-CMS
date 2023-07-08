import { Controller, Get, Param } from '@nestjs/common';

import { CharactersService } from './characters.service';

@Controller('characters')
export class CharactersController
{
    constructor(private readonly charactersService: CharactersService)
    {

    }

    @Get('realm/:realm/arena-team/type/:type')
    public async getArenaTeamByType(@Param('realm') realm: string, @Param('type') type: number)
    {
        return this.charactersService.getArenaTeamByType(realm, type);
    }

    @Get('realm/:realm/arena-team/id/:id')
    public async getArenaTeamById(@Param('realm') realm: string, @Param('id') id: number)
    {
        return this.charactersService.getArenaTeamById(realm, id);
    }

    @Get('realm/:realm/arena-team-member/id/:id')
    public async getArenaTeamMember(@Param('realm') realm: string, @Param('id') id: number)
    {
        return this.charactersService.getArenaTeamMember(realm, id);
    }
}

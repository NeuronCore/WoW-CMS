import { Controller, Get, Param, ParseIntPipe, Post, Query, UseGuards } from '@nestjs/common';
import { ApiSecurity, ApiTags } from '@nestjs/swagger';

import { AuthGuard } from '@/auth/auth.guard';

import { AccountDecorator } from '@/account/account.decorator';

import { CharactersService } from './characters.service';

@Controller('characters')
@ApiTags('Characters')
export class CharactersController
{
    constructor(private readonly charactersService: CharactersService)
    {

    }

    // Top Players
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

    @Get('realm/:realm/top-played-time')
    public async getTopPlayedTime(@Param('realm') realm: string, @Query('page') page: number, @Query('limit') limit: number)
    {
        return this.charactersService.getTopPlayedTime(realm, page, limit);
    }

    // Character Service
    @Post('realm/:realm/rename/guid/:guid')
    @ApiSecurity('JsonWebToken')
    @UseGuards(AuthGuard)
    public async rename(@Param('realm') realm: string, @AccountDecorator() accountID: number, @Param('guid', ParseIntPipe) guid: number)
    {
        return this.charactersService.rename(realm, accountID, guid);
    }

    @Post('realm/:realm/customize/guid/:guid')
    @ApiSecurity('JsonWebToken')
    @UseGuards(AuthGuard)
    public async customize(@Param('realm') realm: string, @AccountDecorator() accountID: number, @Param('guid', ParseIntPipe) guid: number)
    {
        return this.charactersService.customize(realm, accountID, guid);
    }

    @Post('realm/:realm/changeFaction/guid/:guid')
    @ApiSecurity('JsonWebToken')
    @UseGuards(AuthGuard)
    public async changeFaction(@Param('realm') realm: string, @AccountDecorator() accountID: number, @Param('guid', ParseIntPipe) guid: number)
    {
        return this.charactersService.changeFaction(realm, accountID, guid);
    }

    @Post('realm/:realm/changeRace/guid/:guid')
    @ApiSecurity('JsonWebToken')
    @UseGuards(AuthGuard)
    public async changeRace(@Param('realm') realm: string, @AccountDecorator() accountID: number, @Param('guid', ParseIntPipe) guid: number)
    {
        return this.charactersService.changeRace(realm, accountID, guid);
    }

    @Post('realm/:realm/unstuck/guid/:guid')
    @ApiSecurity('JsonWebToken')
    @UseGuards(AuthGuard)
    public async unstuck(@Param('realm') realm: string, @AccountDecorator() accountID: number, @Param('guid', ParseIntPipe) guid: number)
    {
        return this.charactersService.unstuck(realm, accountID, guid);
    }
}

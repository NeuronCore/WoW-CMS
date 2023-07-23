import { BadRequestException, HttpStatus, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Pool } from 'mysql2/promise';

import { Soap } from '@/utils/soap.util';

@Injectable()
export class CharactersService
{
    constructor(
        @Inject('CHARACTERS_DATABASE') private charactersDatabase: Pool,
        @Inject('WEB_DATABASE') private webDatabase: Pool,
    )
    {

    }

    // Characters
    public async getCharacters(realm: string, accountID: number)
    {
        const charactersDatabase = this.charactersDatabase[realm];
        if (!charactersDatabase)
            throw new BadRequestException('A realm with this name doesn\'t exist');

        const sql =
        `
            SELECT
                guid, name, race, class, gender, level, money, online, totaltime, leveltime
            FROM
                characters
            WHERE
                account = ?
        `;

        const [characters] = await charactersDatabase.query(sql, [accountID]);

        return { statusCode: HttpStatus.OK, data: { totals: characters.length, characters } };
    }

    // Top Players
    public async getArenaTeamByType(realm: string, type: number, page = 1, limit = 20)
    {
        const charactersDatabase = this.charactersDatabase[realm];
        if (!charactersDatabase)
            throw new BadRequestException('A realm with this name doesn\'t exist');

        const sql =
        `
            SELECT
                arena_team.*,
                characters.guid AS captainGuid,
                characters.name AS captainName,
                characters.race AS captainRace
            FROM
                arena_team
            INNER JOIN
                characters ON arena_team.captainGuid = characters.guid
            WHERE
                arena_team.type = ?
            ORDER BY
                arena_team.rating DESC
            LIMIT ${ page - 1 }, ${ limit };
        `;

        const [arenaTeamType] = await charactersDatabase.query(sql, [type]);

        return { statusCode: HttpStatus.OK, data: { totals: arenaTeamType.length, arenaTeamType } };
    }

    public async getArenaTeamById(realm: string, id: number, page = 1, limit = 20)
    {
        const charactersDatabase = this.charactersDatabase[realm];
        if (!charactersDatabase)
            throw new BadRequestException('A realm with this name doesn\'t exist');

        const sql =
        `
            SELECT
                arena_team.*,
                characters.guid AS captainGuid,
                characters.name AS captainName,
                characters.race AS captainRace
            FROM
                arena_team
            INNER JOIN
                characters ON arena_team.captainGuid = characters.guid
            WHERE
                arena_team.arenaTeamId = ?
            LIMIT ${ page - 1 }, ${ limit };
        `;

        const [arenaTeamId] = await charactersDatabase.query(sql, [id]);

        return { statusCode: HttpStatus.OK, data: { totals: arenaTeamId.length, arenaTeamId } };
    }

    public async getArenaTeamMember(realm: string, id: number, page = 1, limit = 20)
    {
        const charactersDatabase = this.charactersDatabase[realm];
        if (!charactersDatabase)
            throw new BadRequestException('A realm with this name doesn\'t exist');

        const sql =
        `
            SELECT
                arena_team_member.*,
                characters.name AS name,
                characters.race AS race,
                characters.class AS class,
                characters.gender AS gender,
                character_arena_stats.matchmakerRating AS matchmakerRating
            FROM
                arena_team_member
            INNER JOIN
                characters ON characters.guid = arena_team_member.guid
            INNER JOIN
                arena_team ON arena_team.arenaTeamId = arena_team_member.arenaTeamId
            LEFT JOIN
                character_arena_stats ON (arena_team_member.guid = character_arena_stats.guid AND arena_team.type = (CASE character_arena_stats.slot WHEN 0 THEN 2 WHEN 1 THEN 3 WHEN 2 THEN 5 END))
            WHERE
                arena_team.arenaTeamId = ?
            LIMIT ${ page - 1 }, ${ limit };
        `;

        const [arenaTeamMember] = await charactersDatabase.query(sql, [id]);

        return { statusCode: HttpStatus.OK, data: { totals: arenaTeamMember.length, arenaTeamMember } };
    }

    public async getTopKillers(realm: string, page = 1, limit = 20)
    {
        const charactersDatabase = this.charactersDatabase[realm];
        if (!charactersDatabase)
            throw new BadRequestException('A realm with this name doesn\'t exist');

        const sql =
        `
            SELECT
                guid, name, race, class, totalKills, todayKills, yesterdayKills
            FROM
                characters
            ORDER BY
                totalKills DESC
            LIMIT ${ page - 1 }, ${ limit };
        `;

        const [topKillers] = await charactersDatabase.query(sql);

        return { statusCode: HttpStatus.OK, data: { totals: topKillers.length, topKillers } };
    }

    public async getTopAchievements(realm: string, page = 1, limit = 20)
    {
        const charactersDatabase = this.charactersDatabase[realm];
        if (!charactersDatabase)
            throw new BadRequestException('A realm with this name doesn\'t exist');

        const sql =
        `
            SELECT
                (COUNT(character_achievement.guid) * 10) AS achievements,
                characters.name,
                characters.guid,
                characters.race,
                characters.class
            FROM
                character_achievement
            INNER JOIN
                characters ON characters.guid = character_achievement.guid
            GROUP BY
                character_achievement.guid
            ORDER BY
                achievements DESC
            LIMIT ${ page - 1 }, ${ limit };
        `;

        const [topAchievements] = await charactersDatabase.query(sql);

        return { statusCode: HttpStatus.OK, data: { totals: topAchievements.length, topAchievements } };
    }

    public async getTopPlayedTime(realm: string, page = 1, limit = 20)
    {
        const charactersDatabase = this.charactersDatabase[realm];
        if (!charactersDatabase)
            throw new BadRequestException('A realm with this name doesn\'t exist');

        const sql =
        `
            SELECT
                guid, name, race, class, totaltime
            FROM
                characters
            WHERE
                name != ''
            ORDER BY
                totaltime DESC
            LIMIT ${ page - 1 }, ${ limit };
        `;

        const [topPlayedTime] = await charactersDatabase.query(sql);

        return { statusCode: HttpStatus.OK, data: { totals: topPlayedTime.length, topPlayedTime } };
    }

    // Character Service
    private async characterServiceValidation(realm: string, accountID: number, guid: number, service: number)
    {
        const charactersDatabase = this.charactersDatabase[realm];
        if (!charactersDatabase)
            throw new BadRequestException('A realm with this name doesn\'t exist');

        const [character] = await charactersDatabase.query('SELECT `guid`, `name` FROM `characters` WHERE `account` = ? AND `guid` = ?', [accountID, guid]);
        if (character[0]?.guid !== guid)
            throw new NotFoundException('Account with that character not found');

        const [accountInformation] = await this.webDatabase.query('SELECT `coins` FROM `account_information` WHERE `id` = ?', [accountID]);
        if (!accountInformation[0])
            throw new NotFoundException('There are no accounts with this ID');

        const [characterService] = await this.webDatabase.query('SELECT `coins` FROM `character_service` WHERE `id` = ?', [service]);
        if (!characterService[0])
            throw new NotFoundException('There are no services with this ID');

        if (accountInformation[0].coins < characterService[0].coins)
            throw new NotFoundException('You don\'t have enough coins');

        return [character[0], accountInformation[0].coins, characterService[0].coins];
    }

    public async rename(realm: string, accountID: number, guid: number)
    {
        const [character, accountInformation, characterService] = await this.characterServiceValidation(realm, accountID, guid, 1);

        await Soap.command(`character rename ${ character.name }`);

        await this.webDatabase.execute('UPDATE `account_information` SET `coins` = ? WHERE `id` = ?', [accountInformation - characterService, accountID]);

        return { statusCode: HttpStatus.OK, message: `This operation was done successfully for ${ character.name }'s character` };
    }

    public async customize(realm: string, accountID: number, guid: number)
    {
        const [character, accountInformation, characterService] = await this.characterServiceValidation(realm, accountID, guid, 2);

        await Soap.command(`character customize ${ character.name }`);

        await this.webDatabase.execute('UPDATE `account_information` SET `coins` = ? WHERE `id` = ?', [accountInformation - characterService, accountID]);

        return { statusCode: HttpStatus.OK, message: `This operation was done successfully for ${ character.name }'s character` };
    }

    public async changeFaction(realm: string, accountID: number, guid: number)
    {
        const [character, accountInformation, characterService] = await this.characterServiceValidation(realm, accountID, guid, 3);

        await Soap.command(`character changefaction ${ character.name }`);

        await this.webDatabase.execute('UPDATE `account_information` SET `coins` = ? WHERE `id` = ?', [accountInformation - characterService, accountID]);

        return { statusCode: HttpStatus.OK, message: `This operation was done successfully for ${ character.name }'s character` };
    }

    public async changeRace(realm: string, accountID: number, guid: number)
    {
        const [character, accountInformation, characterService] = await this.characterServiceValidation(realm, accountID, guid, 4);

        await Soap.command(`character changerace ${ character.name }`);

        await this.webDatabase.execute('UPDATE `account_information` SET `coins` = ? WHERE `id` = ?', [accountInformation - characterService, accountID]);

        return { statusCode: HttpStatus.OK, message: `This operation was done successfully for ${ character.name }'s character` };
    }

    public async unstuck(realm: string, accountID: number, guid: number)
    {
        const [character, accountInformation, characterService] = await this.characterServiceValidation(realm, accountID, guid, 5);

        await Soap.command(`unstuck ${ character.name } graveyard`);
        await Soap.command(`revive ${ character.name }`);

        await this.webDatabase.execute('UPDATE `account_information` SET `coins` = ? WHERE `id` = ?', [accountInformation - characterService, accountID]);

        return { statusCode: HttpStatus.OK, message: `This operation was done successfully for ${ character.name }'s character` };
    }
}

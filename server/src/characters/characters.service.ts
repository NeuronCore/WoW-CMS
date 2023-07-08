import { BadRequestException, HttpStatus, Inject, Injectable } from '@nestjs/common';

import { Pool } from 'mysql2/promise';

@Injectable()
export class CharactersService
{
    constructor(@Inject('CHARACTERS_DATABASE') private charactersDatabase: Pool)
    {

    }

    public async getArenaTeamByType(realm: string, type: number)
    {
        const charactersDatabase = this.charactersDatabase[realm];

        if (!charactersDatabase)
            throw new BadRequestException('A realm with this name doesn\'t exist');

        const sql =
        `
            SELECT
                arena_team.*,
                characters.name AS captainName,
                characters.race AS captainRace
            FROM
                arena_team
            INNER JOIN
                characters ON arena_team.captainGuid = characters.guid
            WHERE
                arena_team.type = ?
            ORDER BY
                arena_team.rating DESC;
        `;

        const [arenaTeamType] = await charactersDatabase.query(sql, [type]);

        return { statusCode: HttpStatus.OK, data: { arenaTeamType } };
    }

    public async getArenaTeamById(realm: string, id: number)
    {
        const charactersDatabase = this.charactersDatabase[realm];

        if (!charactersDatabase)
            throw new BadRequestException('A realm with this name doesn\'t exist');

        const sql =
        `
            SELECT
                arena_team.*,
                characters.name AS captainName,
                characters.race AS captainRace
            FROM
                arena_team
            INNER JOIN
                characters ON arena_team.captainGuid = characters.guid
            WHERE
                arena_team.arenaTeamId = ?
        `;

        const [arenaTeamId] = await charactersDatabase.query(sql, [id]);

        return { statusCode: HttpStatus.OK, data: { arenaTeamId } };
    }

    public async getArenaTeamMember(realm: string, id: number)
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
        `;

        const [arenaTeamMember] = await charactersDatabase.query(sql, [id]);

        return { statusCode: HttpStatus.OK, data: { arenaTeamMember } };
    }

    public async getTopKillers(realm: string)
    {
        const charactersDatabase = this.charactersDatabase[realm];

        if (!charactersDatabase)
            throw new BadRequestException('A realm with this name doesn\'t exist');

        const sql =
        `
            SELECT
                name, race, class, totalKills, todayKills, yesterdayKills
            FROM
                characters
            ORDER BY
                totalKills DESC;
        `;

        const [topKillers] = await charactersDatabase.query(sql);

        return { statusCode: HttpStatus.OK, data: { topKillers } };
    }

    public async getTopAchievements(realm: string)
    {
        const charactersDatabase = this.charactersDatabase[realm];

        if (!charactersDatabase)
            throw new BadRequestException('A realm with this name doesn\'t exist');

        const sql =
        `
            SELECT
                (COUNT(character_achievement.guid) * 10) AS achievements,
                characters.name
            FROM
                character_achievement
            INNER JOIN
                characters ON characters.guid = character_achievement.guid
            GROUP BY
                character_achievement.guid
            ORDER BY
                character_achievement.guid
        `;

        const [topAchievements] = await charactersDatabase.query(sql);

        return { statusCode: HttpStatus.OK, data: { topAchievements } };
    }
}

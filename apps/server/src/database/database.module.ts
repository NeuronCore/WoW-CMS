import { Module } from '@nestjs/common';
import { Pool, createPool } from 'mysql2/promise';

import { DatabaseController } from '@/database/database.controller';
import { DatabaseService } from '@/database/database.service';

@Module
({
    controllers: [DatabaseController],
    providers:
    [
        {
            provide: 'AUTH_DATABASE',
            useFactory: async(): Promise<Pool> =>
            {
                return createPool
                ({
                    host: process.env.AUTH_DATABASE_HOST,
                    port: +process.env.AUTH_DATABASE_PORT,
                    database: process.env.AUTH_DATABASE_NAME,
                    user: process.env.AUTH_DATABASE_USERNAME,
                    password: process.env.AUTH_DATABASE_PASSWORD
                });
            }
        },
        {
            provide: 'CHARACTERS_DATABASE',
            useFactory: async(): Promise<{ [p: string]: Pool }> =>
            {
                const charactersDatabases = { };

                for (let i = 0; i < +process.env.CHARACTER_DATABASE_LENGTH + 1; i++)
                {
                    charactersDatabases[process.env[`CHARACTERS_${ i }_DATABASE_REALM_NAME`]] = createPool
                    ({
                        host: process.env[`CHARACTERS_${ i }_DATABASE_HOST`],
                        port: +process.env[`CHARACTERS_${ i }_DATABASE_PORT`],
                        database: process.env[`CHARACTERS_${ i }_DATABASE_NAME`],
                        user: process.env[`CHARACTERS_${ i }_DATABASE_USERNAME`],
                        password: process.env[`CHARACTERS_${ i }_DATABASE_PASSWORD`]
                    });

                    charactersDatabases[process.env[`CHARACTERS_${ i }_DATABASE_REALM_NAME`]].realmLevel = +process.env[`CHARACTERS_${ i }_MAXIMUM_LEVEL`];
                }

                return charactersDatabases;
            }
        },
        {
            provide: 'WORLD_DATABASE',
            useFactory: async(): Promise<Pool> =>
            {
                return createPool
                ({
                    host: process.env.WORLD_DATABASE_HOST,
                    port: +process.env.WORLD_DATABASE_PORT,
                    database: process.env.WORLD_DATABASE_NAME,
                    user: process.env.WORLD_DATABASE_USERNAME,
                    password: process.env.WORLD_DATABASE_PASSWORD
                });
            }
        },
        {
            provide: 'WEB_DATABASE',
            useFactory: async(): Promise<Pool> =>
            {
                return createPool
                ({
                    host: process.env.WEB_DATABASE_HOST,
                    port: +process.env.WEB_DATABASE_PORT,
                    database: process.env.WEB_DATABASE_NAME,
                    user: process.env.WEB_DATABASE_USERNAME,
                    password: process.env.WEB_DATABASE_PASSWORD
                });
            }
        },
        DatabaseService
    ],
    exports: ['AUTH_DATABASE', 'CHARACTERS_DATABASE', 'WORLD_DATABASE', 'WEB_DATABASE']
})
export class DatabaseModule
{

}

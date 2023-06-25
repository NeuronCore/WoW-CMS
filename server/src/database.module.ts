import { Module } from '@nestjs/common';
import { Pool, createPool } from 'mysql2/promise';

@Module
({
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
            useFactory: async(): Promise<{ [key: string]: Pool }> =>
            {
                const charactersDatabases: { [key: string]: Pool } = { };

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
                }

                return charactersDatabases;
            }
        }
    ],
    exports: ['AUTH_DATABASE', 'CHARACTERS_DATABASE']
})
export class DatabaseModule
{

}

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';
import { MulterModule } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';

import { AuthModule } from './auth/auth.module';
import { AccountModule } from './account/account.module';

@Module
({
    imports:
    [
        ConfigModule.forRoot(),
        ThrottlerModule.forRoot({ ttl: 60, limit: 10 }),
        MulterModule.register({ storage: memoryStorage() }),
        AuthModule,
        AccountModule
    ]
})
export class AppModule
{

}

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';
import { MulterModule } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';

import { AuthModule } from './auth/auth.module';
import { AccountModule } from './account/account.module';
import { AccountPasswordModule } from './account-password/account-password.module';
import { PaymentModule } from './payment/payment.module';
import { BlogModule } from './blog/blog.module';

@Module
({
    imports:
    [
        ConfigModule.forRoot({ envFilePath: ['../.env'] }),
        ThrottlerModule.forRoot({ ttl: 60, limit: 10 }),
        MulterModule.register({ storage: memoryStorage() }),
        AuthModule,
        AccountModule,
        AccountPasswordModule,
        PaymentModule,
        BlogModule
    ]
})
export class AppModule
{

}

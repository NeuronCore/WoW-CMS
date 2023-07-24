import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';
import { MulterModule } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import GraphQLJSON from 'graphql-type-json';

import { AuthModule } from './auth/auth.module';
import { AccountModule } from './account/account.module';
import { AccountPasswordModule } from './account-password/account-password.module';
import { PaymentModule } from './payment/payment.module';
import { BlogModule } from './blog/blog.module';
import { CharactersModule } from './characters/characters.module';
import { WebModule } from '@/web/web.module';
import { CommentModule } from './comment/comment.module';

@Module
({
    imports:
    [
        ConfigModule.forRoot({ envFilePath: ['../../.env'] }),
        ThrottlerModule.forRoot({ ttl: 60, limit: 10 }),
        MulterModule.register({ storage: memoryStorage() }),
        GraphQLModule.forRoot<ApolloDriverConfig>({ driver: ApolloDriver, autoSchemaFile: true, resolvers: { JSON: GraphQLJSON } }),
        AuthModule,
        AccountModule,
        AccountPasswordModule,
        PaymentModule,
        BlogModule,
        CharactersModule,
        WebModule,
        CommentModule
    ]
})
export class AppModule
{

}

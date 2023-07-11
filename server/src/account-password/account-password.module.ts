import { Module } from '@nestjs/common';

import { DatabaseModule } from '@/database/database.module';

import { AccountPasswordService } from './account-password.service';
import { AccountPasswordController } from './account-password.controller';
import { AccountPasswordResolver } from '@/account-password/account-password.resolver';

@Module
({
    imports: [DatabaseModule],
    controllers: [AccountPasswordController],
    providers: [AccountPasswordService, AccountPasswordResolver]
})
export class AccountPasswordModule
{

}

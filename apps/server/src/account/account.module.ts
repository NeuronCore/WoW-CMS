import { Module } from '@nestjs/common';

import { DatabaseModule } from '@/database/database.module';

import { AccountService } from './account.service';
import { AccountController } from './account.controller';
import { AccountResolver } from '@/account/account.resolver';

@Module
({
    imports: [DatabaseModule],
    controllers: [AccountController],
    providers: [AccountService, AccountResolver]
})
export class AccountModule
{

}

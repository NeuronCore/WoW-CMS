import { Module } from '@nestjs/common';

import { DatabaseModule } from '@/database.module';

import { AccountService } from './account.service';
import { AccountController } from './account.controller';

@Module
({
    imports: [DatabaseModule],
    controllers: [AccountController],
    providers: [AccountService]
})
export class AccountModule
{

}

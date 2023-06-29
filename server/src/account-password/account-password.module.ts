import { Module } from '@nestjs/common';

import { DatabaseModule } from '../database.module';

import { AccountPasswordService } from './account-password.service';
import { AccountPasswordController } from './account-password.controller';

@Module
({
    imports: [DatabaseModule],
    controllers: [AccountPasswordController],
    providers: [AccountPasswordService]
})
export class AccountPasswordModule
{

}

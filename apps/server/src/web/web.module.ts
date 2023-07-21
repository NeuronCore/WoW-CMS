import { Module } from '@nestjs/common';

import { WebService } from './web.service';
import { WebController } from './web.controller';

import { DatabaseModule } from '@/database/database.module';

@Module
({
    imports: [DatabaseModule],
    controllers: [WebController],
    providers: [WebService]
})
export class WebModule
{
}

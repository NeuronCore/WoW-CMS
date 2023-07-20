import { Module } from '@nestjs/common';

import { FaqService } from './faq.service';
import { FaqController } from './faq.controller';

import { DatabaseModule } from '@/database/database.module';

@Module
({
    imports: [DatabaseModule],
    controllers: [FaqController],
    providers: [FaqService]
})
export class FaqModule
{
}

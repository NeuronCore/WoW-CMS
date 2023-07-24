import { Module } from '@nestjs/common';

import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';

import { DatabaseModule } from '@/database/database.module';

@Module
({
    imports: [DatabaseModule],
    controllers: [CommentController],
    providers: [CommentService]
})
export class CommentModule
{}

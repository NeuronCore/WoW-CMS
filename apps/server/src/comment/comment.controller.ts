import { Body, Controller, Param, ParseIntPipe, Post, UseGuards } from '@nestjs/common';
import { ApiSecurity, ApiTags } from '@nestjs/swagger';

import { CommentService } from './comment.service';

import { AuthGuard } from '@/auth/auth.guard';
import { AccountDecorator } from '@/account/account.decorator';

import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Controller('comment')
@ApiTags('Comment')
export class CommentController
{
    constructor(private readonly commentService: CommentService)
    {}

    @Post('create/blog-id/:blogID')
    @ApiSecurity('JsonWebToken')
    @UseGuards(AuthGuard)
    public async create(@AccountDecorator() accountID: number, @Param('blogID', ParseIntPipe) blogID: number, @Body() createCommentDto: CreateCommentDto)
    {
        return this.commentService.create(accountID, blogID, createCommentDto);
    }

    @Post('reply/comment-id/:commentID')
    @ApiSecurity('JsonWebToken')
    @UseGuards(AuthGuard)
    public async reply(@AccountDecorator() accountID: number, @Param('commentID', ParseIntPipe) commentID: number, @Body() createCommentDto: CreateCommentDto)
    {
        return this.commentService.reply(accountID, commentID, createCommentDto);
    }
}

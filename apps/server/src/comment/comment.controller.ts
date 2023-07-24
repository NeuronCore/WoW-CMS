import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, UseGuards } from '@nestjs/common';
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

    @Patch('update/comment-id/:commentID')
    @ApiSecurity('JsonWebToken')
    @UseGuards(AuthGuard)
    public async update(@AccountDecorator() accountID: number, @Param('commentID', ParseIntPipe) commentID: number, @Body() updateCommentDto: UpdateCommentDto)
    {
        return this.commentService.update(accountID, commentID, updateCommentDto);
    }

    @Delete('delete/comment-id/:commentID')
    @ApiSecurity('JsonWebToken')
    @UseGuards(AuthGuard)
    public async remove(@AccountDecorator() accountID: number, @Param('commentID', ParseIntPipe) commentID: number)
    {
        return this.commentService.remove(accountID, commentID);
    }

    @Get('find-all/blog-id/:blogID')
    public async findAll(@Param('blogID', ParseIntPipe) blogID: number, @Query('page') page: number, @Query('limit') limit: number)
    {
        return this.commentService.findAll(blogID, page, limit);
    }

    @Get('find-all-replies/comment-id/:commentID')
    public async findAllReplies(@Param('commentID', ParseIntPipe) commentID: number, @Query('page') page: number, @Query('limit') limit: number)
    {
        return this.commentService.findAllReplies(commentID, page, limit);
    }
}

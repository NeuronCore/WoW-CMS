import { Controller, Post, Body, UseGuards, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

import { AuthGuard } from '@/auth/auth.guard';

import { AccountRole } from '@/account/account-role.enum';
import { Roles } from '@/account/account-role.decorator';
import { AccountDecorator } from '@/account/account.decorator';

import { BlogService } from './blog.service';

import { CreateBlogDto } from './dto/create-blog.dto';

@Controller('blog')
export class BlogController
{
    constructor(private readonly blogService: BlogService)
    { }

    @Post('/create')
    @UseGuards(AuthGuard)
    @Roles(AccountRole.ADMIN, AccountRole.MANAGER)
    @UseInterceptors(FileInterceptor('thumbnail'))
    public async create(@AccountDecorator() accountID: number, @Body() createBlogDto: CreateBlogDto, @UploadedFile() thumbnail: Express.Multer.File)
    {
        return this.blogService.create(accountID, createBlogDto, thumbnail);
    }
}

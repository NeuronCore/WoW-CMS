import { Controller, Post, Body, UseGuards, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiSecurity, ApiTags } from '@nestjs/swagger';

import { AuthGuard } from '@/auth/auth.guard';

import { AccountRole } from '@/account/account-role.enum';
import { Roles } from '@/account/account-role.decorator';
import { AccountDecorator } from '@/account/account.decorator';

import { BlogService } from './blog.service';

import { CreateBlogDto } from './dto/create-blog.dto';

@Controller('blog')
@ApiTags('Blog')
@ApiSecurity('JsonWebToken')
export class BlogController
{
    constructor(private readonly blogService: BlogService)
    { }

    @Post('/create')

    @UseGuards(AuthGuard)
    @Roles(AccountRole.ADMIN, AccountRole.MANAGER)
    @UseInterceptors(FileInterceptor('thumbnail'))
    @ApiConsumes('multipart/form-data')
    @ApiBody
    ({
        schema:
        {
            type: 'object',
            properties:
            {
                title: { type: 'string' },
                meta_title: { type: 'string' },
                slug: { type: 'string' },
                summary: { type: 'string' },
                content: { type: 'string' },
                published: { type: 'enum' },
                thumbnail: { type: 'string', format: 'binary' }
            }
        }
    })
    public async create(@AccountDecorator() accountID: number, @Body() createBlogDto: CreateBlogDto, @UploadedFile() thumbnail: Express.Multer.File)
    {
        return this.blogService.create(accountID, createBlogDto, thumbnail);
    }
}

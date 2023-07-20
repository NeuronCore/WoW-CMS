import { Controller, Post, Body, UseGuards, UseInterceptors, UploadedFile, ParseIntPipe, Param, Patch, Delete } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiSecurity, ApiTags } from '@nestjs/swagger';

import { AuthGuard } from '@/auth/auth.guard';

import { AccountRole } from '@/account/account-role.enum';
import { Roles } from '@/account/account-role.decorator';
import { AccountDecorator } from '@/account/account.decorator';

import { BlogService } from './blog.service';

import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from '@/blog/dto/update-blog.dto';

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
                metaTitle: { type: 'string' },
                slug: { type: 'string' },
                summary: { type: 'string' },
                content: { type: 'string' },
                published: { type: 'enum', enum: ['Confirmed', 'Rejected', 'Waiting'] },
                thumbnail: { type: 'string', format: 'binary' }
            }
        }
    })
    public async create(@AccountDecorator() accountID: number, @Body() createBlogDto: CreateBlogDto, @UploadedFile() thumbnail: Express.Multer.File)
    {
        return this.blogService.create(accountID, createBlogDto, thumbnail);
    }

    @Patch('update/:id')
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
                metaTitle: { type: 'string' },
                slug: { type: 'string' },
                summary: { type: 'string' },
                content: { type: 'string' },
                published: { type: 'enum', enum: ['Confirmed', 'Rejected', 'Waiting'] },
                thumbnail: { type: 'string', format: 'binary' }
            }
        }
    })
    public async update(@AccountDecorator() accountID: number, @Param('id', ParseIntPipe) id: number, @Body() updateBlogDto: UpdateBlogDto, @UploadedFile() thumbnail: Express.Multer.File)
    {
        return this.blogService.update(accountID, id, updateBlogDto, thumbnail);
    }

    @Delete('/delete/:id')
    @UseGuards(AuthGuard)
    @Roles(AccountRole.ADMIN, AccountRole.MANAGER)
    public async remove(@Param('id', ParseIntPipe) id: number)
    {
        return this.blogService.remove(id);
    }
}

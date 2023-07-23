import { Controller, Post, Body, UseGuards, UseInterceptors, UploadedFile, ParseIntPipe, Param, Patch, Delete, Query, Get } from '@nestjs/common';
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
export class BlogController
{
    constructor(private readonly blogService: BlogService)
    { }

    @Post('/create')
    @ApiSecurity('JsonWebToken')
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
                titleEN: { type: 'string' },
                titleDE: { type: 'string' },
                titleFA: { type: 'string' },
                metaTitleEN: { type: 'string' },
                metaTitleDE: { type: 'string' },
                metaTitleFA: { type: 'string' },
                slug: { type: 'string' },
                summaryEN: { type: 'string' },
                summaryDE: { type: 'string' },
                summaryFA: { type: 'string' },
                contentEN: { type: 'string' },
                contentDE: { type: 'string' },
                contentFA: { type: 'string' },
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
    @ApiSecurity('JsonWebToken')
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
                titleEN: { type: 'string' },
                titleDE: { type: 'string' },
                titleFA: { type: 'string' },
                metaTitleEN: { type: 'string' },
                metaTitleDE: { type: 'string' },
                metaTitleFA: { type: 'string' },
                slug: { type: 'string' },
                summaryEN: { type: 'string' },
                summaryDE: { type: 'string' },
                summaryFA: { type: 'string' },
                contentEN: { type: 'string' },
                contentDE: { type: 'string' },
                contentFA: { type: 'string' },
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
    @ApiSecurity('JsonWebToken')
    @UseGuards(AuthGuard)
    @Roles(AccountRole.ADMIN, AccountRole.MANAGER)
    public async remove(@Param('id', ParseIntPipe) id: number)
    {
        return this.blogService.remove(id);
    }

    @Get('/find-by-id/:id')
    public async findByID(@Param('id', ParseIntPipe) id: number, @Query('locale') locale: string)
    {
        return this.blogService.findByID(id, locale);
    }

    @Get('/find-all-by-newest')
    public async findAllByNewest(@Query('locale') locale: string, @Query('page') page: number, @Query('limit') limit: number)
    {
        return this.blogService.findAllByNewest(locale, page, limit);
    }
}

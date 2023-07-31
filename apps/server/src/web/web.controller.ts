import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, UseInterceptors, UploadedFile, Query } from '@nestjs/common';
import { ApiBody, ApiConsumes, ApiSecurity, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';

import { AuthGuard } from '@/auth/auth.guard';
import { Roles } from '@/account/account-role.decorator';
import { AccountRole } from '@/account/account-role.enum';
import { Locale } from '@/shared/enums';

import { WebService } from './web.service';

import { CreateFaqDto } from './dto/create-faq.dto';
import { UpdateFaqDto } from './dto/update-faq.dto';
import { CreateFeatureDto } from './dto/create-feature.dto';
import { UpdateFeatureDto } from './dto/update-feature.dto';
import { CreateCategoryDto } from '@/web/dto/create-category.dto';
import { UpdateCategoryDto } from '@/web/dto/update-category.dto';
import { CreateTagDto } from '@/web/dto/create-tag.dto';
import { UpdateTagDto } from '@/web/dto/update-tag.dto';

@Controller('web')
@ApiTags('Web')
export class WebController
{
    constructor(private readonly webService: WebService)
    {
    }

    @Post('create/faq')
    @ApiSecurity('JsonWebToken')
    @UseGuards(AuthGuard)
    @Roles(AccountRole.ADMIN, AccountRole.MANAGER)
    public async createFAQ(@Body() createFaqDto: CreateFaqDto)
    {
        return this.webService.createFAQ(createFaqDto);
    }

    @Get('find-all/faq')
    public async findAllFAQ(@Query('locale') locale: Locale)
    {
        return this.webService.findAllFAQ(locale);
    }

    @Patch('update/faq/id/:id')
    @ApiSecurity('JsonWebToken')
    @UseGuards(AuthGuard)
    @Roles(AccountRole.ADMIN, AccountRole.MANAGER)
    public async updateFAQ(@Param('id') id: number, @Body() updateFaqDto: UpdateFaqDto)
    {
        return this.webService.updateFAQ(id, updateFaqDto);
    }

    @Delete('remove/faq/id/:id')
    @ApiSecurity('JsonWebToken')
    @UseGuards(AuthGuard)
    @Roles(AccountRole.ADMIN, AccountRole.MANAGER)
    public async removeFAQ(@Param('id') id: number)
    {
        return this.webService.removeFAQ(id);
    }

    @Post('create/feature')
    @ApiSecurity('JsonWebToken')
    @UseGuards(AuthGuard)
    @Roles(AccountRole.ADMIN, AccountRole.MANAGER)
    @UseInterceptors(FileInterceptor('image'))
    @ApiConsumes('multipart/form-data')
    @ApiBody
    ({
        schema:
        {
            type: 'object',
            properties:
            {
                title: { type: 'string' },
                descriptionEN: { type: 'string' },
                descriptionDE: { type: 'string' },
                descriptionFA: { type: 'string' },
                image: { type: 'string', format: 'binary' }
            }
        }
    })
    public async createFeature(@Body() createFeatureDto: CreateFeatureDto, @UploadedFile() image: Express.Multer.File)
    {
        return this.webService.createFeature(createFeatureDto, image);
    }

    @Get('find-all/feature')
    public async findAllFeatures(@Query('locale') locale: Locale)
    {
        return this.webService.findAllFeatures(locale);
    }

    @Patch('update/feature')
    @ApiSecurity('JsonWebToken')
    @UseGuards(AuthGuard)
    @Roles(AccountRole.ADMIN, AccountRole.MANAGER)
    @UseInterceptors(FileInterceptor('image'))
    @ApiConsumes('multipart/form-data')
    @ApiBody
    ({
        schema:
        {
            type: 'object',
            properties:
            {
                title: { type: 'string' },
                descriptionEN: { type: 'string' },
                descriptionDE: { type: 'string' },
                descriptionFA: { type: 'string' },
                image: { type: 'string', format: 'binary' }
            }
        }
    })
    public async updateFeature(@Param('id') id: number, @Body() updateFeatureDto: UpdateFeatureDto, @UploadedFile() image: Express.Multer.File)
    {
        return this.webService.updateFeature(id, updateFeatureDto, image);
    }

    @Delete('remove/feature/id/:id')
    @ApiSecurity('JsonWebToken')
    @UseGuards(AuthGuard)
    @Roles(AccountRole.ADMIN, AccountRole.MANAGER)
    public async removeFeature(@Param('id') id: number)
    {
        return this.webService.removeFeature(id);
    }

    @Post('create/category')
    @ApiSecurity('JsonWebToken')
    @UseGuards(AuthGuard)
    @Roles(AccountRole.ADMIN, AccountRole.MANAGER)
    public async createCategory(@Body() createCategoryDto: CreateCategoryDto)
    {
        return this.webService.createCategory(createCategoryDto);
    }

    @Get('find-all/categories')
    public async findAllCategories(@Query('locale') locale: Locale)
    {
        return this.webService.findAllCategories(locale);
    }

    @Patch('update/category/id/:id')
    @ApiSecurity('JsonWebToken')
    @UseGuards(AuthGuard)
    @Roles(AccountRole.ADMIN, AccountRole.MANAGER)
    public async updateCategory(@Param('id') id: number, @Body() updateCategoryDto: UpdateCategoryDto)
    {
        return this.webService.updateCategory(id, updateCategoryDto);
    }

    @Delete('remove/category/id/:id')
    @ApiSecurity('JsonWebToken')
    @UseGuards(AuthGuard)
    @Roles(AccountRole.ADMIN, AccountRole.MANAGER)
    public async removeCategory(@Param('id') id: number)
    {
        return this.webService.removeCategory(id);
    }

    @Post('create/tag')
    @ApiSecurity('JsonWebToken')
    @UseGuards(AuthGuard)
    @Roles(AccountRole.ADMIN, AccountRole.MANAGER)
    public async createTag(@Body() createTagDto: CreateTagDto)
    {
        return this.webService.createTag(createTagDto);
    }

    @Get('find-all/tags')
    public async findAllTags(@Query('locale') locale: Locale)
    {
        return this.webService.findAllTags(locale);
    }

    @Patch('update/tag/id/:id')
    @ApiSecurity('JsonWebToken')
    @UseGuards(AuthGuard)
    @Roles(AccountRole.ADMIN, AccountRole.MANAGER)
    public async updateTag(@Param('id') id: number, @Body() updateTagDto: UpdateTagDto)
    {
        return this.webService.updateTag(id, updateTagDto);
    }

    @Delete('remove/tag/id/:id')
    @ApiSecurity('JsonWebToken')
    @UseGuards(AuthGuard)
    @Roles(AccountRole.ADMIN, AccountRole.MANAGER)
    public async removeTag(@Param('id') id: number)
    {
        return this.webService.removeTag(id);
    }
}

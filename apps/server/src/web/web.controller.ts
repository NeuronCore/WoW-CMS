import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, UseInterceptors, UploadedFile } from '@nestjs/common';
import { ApiBody, ApiConsumes, ApiSecurity, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';

import { AuthGuard } from '@/auth/auth.guard';
import { Roles } from '@/account/account-role.decorator';
import { AccountRole } from '@/account/account-role.enum';

import { WebService } from './web.service';

import { CreateFaqDto } from './dto/create-faq.dto';
import { UpdateFaqDto } from './dto/update-faq.dto';
import { CreateFeatureDto } from './dto/create-feature.dto';
import { UpdateFeatureDto } from './dto/update-feature.dto';

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
    public async findAllFAQ()
    {
        return this.webService.findAllFAQ();
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
    public async findAllFeatures()
    {
        return this.webService.findAllFeatures();
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
}

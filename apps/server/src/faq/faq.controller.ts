import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ApiSecurity, ApiTags } from '@nestjs/swagger';

import { AuthGuard } from '@/auth/auth.guard';
import { Roles } from '@/account/account-role.decorator';
import { AccountRole } from '@/account/account-role.enum';

import { FaqService } from './faq.service';

import { CreateFaqDto } from './dto/create-faq.dto';
import { UpdateFaqDto } from './dto/update-faq.dto';


@Controller('faq')
@ApiTags('FAQ')
export class FaqController
{
    constructor(private readonly faqService: FaqService)
    {
    }

    @Post('create')
    @ApiSecurity('JsonWebToken')
    @UseGuards(AuthGuard)
    @Roles(AccountRole.ADMIN, AccountRole.MANAGER)
    public async create(@Body() createFaqDto: CreateFaqDto)
    {
        return this.faqService.create(createFaqDto);
    }

    @Get('find-all')
    public async findAll()
    {
        return this.faqService.findAll();
    }

    @Patch(':id')
    @ApiSecurity('JsonWebToken')
    @UseGuards(AuthGuard)
    @Roles(AccountRole.ADMIN, AccountRole.MANAGER)
    public async update(@Param('id') id: number, @Body() updateFaqDto: UpdateFaqDto)
    {
        return this.faqService.update(id, updateFaqDto);
    }

    @Delete(':id')
    @ApiSecurity('JsonWebToken')
    @UseGuards(AuthGuard)
    @Roles(AccountRole.ADMIN, AccountRole.MANAGER)
    public async remove(@Param('id') id: number)
    {
        return this.faqService.remove(id);
    }
}

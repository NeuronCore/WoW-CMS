import { Body, Controller, Get, Patch, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';

import { AuthGuard } from '@/auth/auth.guard';
import { AccountDecorator } from './account.decorator';

import { AccountService } from './account.service';

import { UpdatePasswordDto } from './dto/update-password.dto';

@Controller('account')
export class AccountController
{
    constructor(private readonly accountService: AccountService)
    {

    }

    @Get('current')
    @UseGuards(AuthGuard)
    public async current(@AccountDecorator() accountID: number)
    {
        return this.accountService.current(accountID);
    }

    @Patch('update-password')
    @UseGuards(AuthGuard)
    public async updatePassword(@AccountDecorator() accountID: number, @Body() updatePasswordDto: UpdatePasswordDto, @Res() response: Response)
    {
        return this.accountService.updatePassword(accountID, updatePasswordDto, response);
    }
}

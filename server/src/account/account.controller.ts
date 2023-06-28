import { Controller, Get, UseGuards } from '@nestjs/common';

import { AuthGuard } from '../auth/auth.guard';
import { AccountDecorator } from './account.decorator';

import { AccountService } from './account.service';

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
}

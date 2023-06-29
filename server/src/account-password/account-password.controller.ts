import { Body, Controller, Param, Patch, Post } from '@nestjs/common';

import { AccountPasswordService } from './account-password.service';

import { UpdateResetPasswordDto } from './dto/update-reset-password.dto';

@Controller('account-password')
export class AccountPasswordController
{
    constructor(private readonly accountPasswordService: AccountPasswordService)
    {

    }

    @Post('/forgot-password')
    public async forgotPassword(@Body('email') email: string)
    {
        return this.accountPasswordService.forgotPassword(email);
    }

    @Patch('/reset-password/:token')
    public async resetPassword(@Body() updateResetPasswordDto: UpdateResetPasswordDto, @Param('token') token: string): Promise<object>
    {
        return this.accountPasswordService.resetPassword(updateResetPasswordDto, token);
    }
}

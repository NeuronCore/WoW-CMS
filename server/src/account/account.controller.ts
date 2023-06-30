import { join } from 'path';

import { Body, Controller, Get, Param, Patch, Post, Res, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { Response } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';

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

    @Post('avatar')
    @UseGuards(AuthGuard)
    @UseInterceptors(FileInterceptor('avatar'))
    public async updateAvatar(@AccountDecorator() accountID: number, @UploadedFile() avatar: Express.Multer.File)
    {
        return this.accountService.updateAvatar(accountID, avatar);
    }

    @Get('uploaded-image/:folder/:image')
    @UseGuards(AuthGuard)
    public async getAvatar(@Param('folder') folder: string, @Param('image') image: string, @Res() res: Response)
    {
        return res.sendFile(join(__dirname, '..', '..', `uploads/${ folder }/${ image }`));
    }
}

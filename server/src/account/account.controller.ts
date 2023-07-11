import { join } from 'path';

import { Body, Controller, Get, Param, Patch, Post, Res, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { Response } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiSecurity, ApiTags } from '@nestjs/swagger';

import { AuthGuard } from '@/auth/auth.guard';
import { AccountDecorator } from './account.decorator';

import { AccountService } from './account.service';

import { UpdatePasswordDto } from './dto/update-password.dto';
import { UpdateInformationDto } from '@/account/dto/update-information.dto';

@Controller('account')
@ApiTags('Account')
@ApiSecurity('JsonWebToken')
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
    public async updatePassword(@AccountDecorator() accountID: number, @Body() updatePasswordDto: UpdatePasswordDto, @Res({ passthrough: true }) response: Response)
    {
        return this.accountService.updatePassword(accountID, updatePasswordDto, response);
    }

    @Post('avatar')
    @ApiConsumes('multipart/form-data')
    @ApiBody({ schema: { type: 'object', properties: { avatar: { type: 'string', format: 'binary' } } } })
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

    @Patch('update-information')
    @UseGuards(AuthGuard)
    public async updateInformation(@AccountDecorator() accountID: number, @Body() updateInformationDto: UpdateInformationDto)
    {
        return this.accountService.updateInformation(accountID, updateInformationDto);
    }
}

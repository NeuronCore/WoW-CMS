import { Body, Controller, Post } from '@nestjs/common';

import { AuthService } from './auth.service';

import { RegisterDto } from './dto/register.dto';

@Controller('auth')
export class AuthController
{
    constructor(private readonly authService: AuthService)
    {
    }

    @Post('register')
    public async register(@Body() registerDto: RegisterDto)
    {
        return this.authService.register(registerDto);
    }
}

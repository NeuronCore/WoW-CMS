import { Resolver, Args, Mutation, Context, Query } from '@nestjs/graphql';
import { Request } from 'express';

import { AuthType } from '@/auth/auth.type';
import { AuthService } from '@/auth/auth.service';

import { RegisterDto } from '@/auth/dto/register.dto';
import { LoginDto } from '@/auth/dto/login.dto';

@Resolver(() => AuthType)
export class AuthResolver
{
    constructor(private authService: AuthService)
    {}

    @Mutation(() => AuthType)
    public async register(@Args('registerDto') registerDto: RegisterDto)
    {
        return this.authService.register(registerDto);
    }

    @Mutation(() => AuthType)
    public async login(@Args('loginDto') loginDto: LoginDto, @Context('req') request: Request)
    {
        return this.authService.login(loginDto, request.res);
    }

    @Query(() => AuthType)
    public async logout(@Context('req') request: Request)
    {
        return this.authService.logout(request, request.res);
    }

    @Mutation(() => AuthType)
    public async refresh(@Context('req') request: Request)
    {
        return this.authService.refresh(request);
    }
}

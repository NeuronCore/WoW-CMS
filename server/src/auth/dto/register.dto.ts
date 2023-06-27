import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';

export class RegisterDto
{
    @IsString()
    @MinLength(2)
    @MaxLength(20)
    firstName: string;

    @IsString()
    @MinLength(2)
    @MaxLength(20)
    lastName: string;

    @IsString()
    @MinLength(4)
    @MaxLength(20)
    username: string;

    @IsString()
    @IsEmail()
    email: string;

    @IsString()
    @MinLength(4)
    @MaxLength(30)
    password: string;

    @IsString()
    @MinLength(4)
    @MaxLength(30)
    passwordConfirm: string;
}

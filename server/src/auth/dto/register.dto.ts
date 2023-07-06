import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';

export class RegisterDto
{
    @ApiProperty()
    @IsString()
    @MinLength(2)
    @MaxLength(20)
    public readonly firstName: string;

    @ApiProperty()
    @IsString()
    @MinLength(2)
    @MaxLength(20)
    public readonly lastName: string;

    @ApiProperty()
    @IsString()
    @MinLength(4)
    @MaxLength(20)
    public readonly username: string;

    @ApiProperty()
    @IsString()
    @IsEmail()
    public readonly email: string;

    @ApiProperty()
    @IsString()
    @MinLength(4)
    @MaxLength(30)
    public readonly password: string;

    @ApiProperty()
    @IsString()
    @MinLength(4)
    @MaxLength(30)
    public readonly passwordConfirm: string;
}

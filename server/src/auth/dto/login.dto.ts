import { IsString, MaxLength, MinLength } from 'class-validator';

export class LoginDto
{
    @IsString()
    @MinLength(4)
    @MaxLength(20)
    username: string;

    @IsString()
    @MinLength(4)
    @MaxLength(30)
    password: string;
}

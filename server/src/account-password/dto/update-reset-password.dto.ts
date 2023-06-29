import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class UpdateResetPasswordDto
{
    @IsNotEmpty()
    @MinLength(5)
    @MaxLength(32)
    readonly password: string;

    @IsString()
    readonly passwordConfirm: string;
}

import { IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export class UpdatePasswordDto
{
    @IsNotEmpty()
    currentPassword: string;

    @IsNotEmpty()
    @MinLength(5)
    @MaxLength(32)
    newPassword: string;

    @IsNotEmpty()
    @MinLength(5)
    @MaxLength(32)
    newPasswordConfirm: string;
}

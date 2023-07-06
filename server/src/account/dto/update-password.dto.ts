import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export class UpdatePasswordDto
{
    @ApiProperty()
    @IsNotEmpty()
    public readonly currentPassword: string;

    @ApiProperty()
    @IsNotEmpty()
    @MinLength(5)
    @MaxLength(32)
    public readonly newPassword: string;

    @ApiProperty()
    @IsNotEmpty()
    @MinLength(5)
    @MaxLength(32)
    public readonly newPasswordConfirm: string;
}

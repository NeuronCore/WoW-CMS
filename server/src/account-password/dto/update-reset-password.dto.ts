import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class UpdateResetPasswordDto
{
    @ApiProperty()
    @IsNotEmpty()
    @MinLength(5)
    @MaxLength(32)
    public readonly password: string;

    @ApiProperty()
    @IsString()
    public readonly passwordConfirm: string;
}

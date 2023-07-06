import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class LoginDto
{
    @ApiProperty()
    @IsString()
    public readonly username: string;

    @ApiProperty()
    @IsString()
    public readonly password: string;
}

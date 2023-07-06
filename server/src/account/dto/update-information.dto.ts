import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsPhoneNumber, IsString, MaxLength, MinLength } from 'class-validator';

export class UpdateInformationDto
{
    @ApiProperty()
    @IsString()
    @MinLength(2)
    @MaxLength(20)
    @IsOptional()
    public readonly firstName: string;

    @ApiProperty()
    @IsString()
    @MinLength(2)
    @MaxLength(20)
    @IsOptional()
    public readonly lastName: string;

    @ApiProperty()
    @IsPhoneNumber()
    @IsOptional()
    public readonly phone: string;
}

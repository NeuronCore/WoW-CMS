import { IsOptional, IsPhoneNumber, IsString, MaxLength, MinLength } from 'class-validator';

export class UpdateInformationDto
{
    @IsString()
    @MinLength(2)
    @MaxLength(20)
    @IsOptional()
    firstName: string;

    @IsString()
    @MinLength(2)
    @MaxLength(20)
    @IsOptional()
    lastName: string;

    @IsPhoneNumber()
    @IsOptional()
    phone: string;
}

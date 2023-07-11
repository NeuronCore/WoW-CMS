import { Field, InputType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsPhoneNumber, IsString, MaxLength, MinLength } from 'class-validator';

@InputType()
export class UpdateInformationDto
{
    @ApiProperty()
    @IsString()
    @MinLength(2)
    @MaxLength(20)
    @IsOptional()
    @Field()
    public readonly firstName: string;

    @ApiProperty()
    @IsString()
    @MinLength(2)
    @MaxLength(20)
    @IsOptional()
    @Field()
    public readonly lastName: string;

    @ApiProperty()
    @IsPhoneNumber()
    @IsOptional()
    @Field()
    public readonly phone: string;
}

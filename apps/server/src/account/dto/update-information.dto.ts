import { Field, InputType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsPhoneNumber, Length } from 'class-validator';

@InputType()
export class UpdateInformationDto
{
    @ApiProperty()
    @Length(1, 30, { message: '1000' })
    @IsOptional()
    @Field()
    public readonly firstName: string;

    @ApiProperty()
    @Length(1, 30, { message: '1000' })
    @IsOptional()
    @Field()
    public readonly lastName: string;

    @ApiProperty()
    @IsPhoneNumber()
    @IsOptional()
    @Field()
    public readonly phone: string;
}

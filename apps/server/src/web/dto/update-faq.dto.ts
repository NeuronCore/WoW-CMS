import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, Length } from 'class-validator';
import { Field } from '@nestjs/graphql';

export class UpdateFaqDto
{
    @ApiProperty()
    @Length(1, 50, { message: '1003' })
    @Field()
    @IsOptional()
    public readonly titleEN: string;

    @ApiProperty()
    @Length(1, 50, { message: '1003' })
    @Field()
    @IsOptional()
    public readonly titleDE: string;

    @ApiProperty()
    @Length(1, 50, { message: '1003' })
    @Field()
    @IsOptional()
    public readonly titleFA: string;


    @ApiProperty()
    @Length(1, 255, { message: '1004' })
    @Field()
    @IsOptional()
    public readonly descriptionEN: string;

    @ApiProperty()
    @Length(1, 255, { message: '1004' })
    @Field()
    @IsOptional()
    public readonly descriptionDE: string;

    @ApiProperty()
    @Length(1, 255, { message: '1004' })
    @Field()
    @IsOptional()
    public readonly descriptionFA: string;
}

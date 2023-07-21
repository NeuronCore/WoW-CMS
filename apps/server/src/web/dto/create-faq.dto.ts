import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, Length } from 'class-validator';
import { Field } from '@nestjs/graphql';

export class CreateFaqDto
{
    @ApiProperty()
    @Length(1, 50, { message: '1003' })
    @Field()
    public readonly titleEN: string;

    @ApiProperty()
    @Length(1, 50, { message: '1003' })
    @Field()
    public readonly titleDE: string;

    @ApiProperty()
    @Length(1, 50, { message: '1003' })
    @Field()
    public readonly titleFA: string;

    @ApiProperty()
    @Length(1, 255, { message: '1004' })
    @Field()
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

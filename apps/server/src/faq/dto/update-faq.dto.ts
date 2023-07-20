import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, Length } from 'class-validator';
import { Field } from '@nestjs/graphql';

export class UpdateFaqDto
{
    @ApiProperty()
    @Length(1, 50, { message: '1003' })
    @Field()
    @IsOptional()
    public readonly title: string;

    @ApiProperty()
    @Length(1, 255, { message: '1004' })
    @Field()
    @IsOptional()
    public readonly description: string;
}

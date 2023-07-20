import { ApiProperty } from '@nestjs/swagger';
import { Length } from 'class-validator';
import { Field } from '@nestjs/graphql';

export class CreateFaqDto
{
    @ApiProperty()
    @Length(1, 50, { message: '1003' })
    @Field()
    public readonly title: string;

    @ApiProperty()
    @Length(1, 255, { message: '1004' })
    @Field()
    public readonly description: string;
}

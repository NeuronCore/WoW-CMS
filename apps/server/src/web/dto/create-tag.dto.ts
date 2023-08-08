import { ApiProperty } from '@nestjs/swagger';
import { Length } from 'class-validator';
import { Field } from '@nestjs/graphql';

export class CreateTagDto
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
    @Length(1, 100, { message: '1007' })
    @Field()
    public readonly metaTitleEN: string;

    @ApiProperty()
    @Length(1, 100, { message: '1007' })
    @Field()
    public readonly metaTitleDE: string;

    @ApiProperty()
    @Length(1, 100, { message: '1007' })
    @Field()
    public readonly metaTitleFA: string;

    @ApiProperty()
    @Length(1, 255, { message: '1007' })
    @Field()
    public readonly slug: string;

    @ApiProperty()
    @Length(1, 255, { message: '1004' })
    @Field()
    public readonly contentEN: string;

    @ApiProperty()
    @Length(1, 255, { message: '1004' })
    @Field()
    public readonly contentDE: string;

    @ApiProperty()
    @Length(1, 255, { message: '1004' })
    @Field()
    public readonly contentFA: string;
}

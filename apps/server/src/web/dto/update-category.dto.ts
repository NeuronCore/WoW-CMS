import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, Length } from 'class-validator';
import { Field } from '@nestjs/graphql';

export class UpdateCategoryDto
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
    @Length(1, 100, { message: '1007' })
    @Field()
    @IsOptional()
    public readonly metaTitleEN: string;

    @ApiProperty()
    @Length(1, 100, { message: '1007' })
    @Field()
    @IsOptional()
    public readonly metaTitleDE: string;

    @ApiProperty()
    @Length(1, 100, { message: '1007' })
    @Field()
    @IsOptional()
    public readonly metaTitleFA: string;

    @ApiProperty()
    @Length(1, 255, { message: '1007' })
    @Field()
    @IsOptional()
    public readonly slug: string;

    @ApiProperty()
    @Length(1, 255, { message: '1004' })
    @Field()
    @IsOptional()
    public readonly contentEN: string;

    @ApiProperty()
    @Length(1, 255, { message: '1004' })
    @Field()
    @IsOptional()
    public readonly contentDE: string;

    @ApiProperty()
    @Length(1, 255, { message: '1004' })
    @Field()
    @IsOptional()
    public readonly contentFA: string;
}

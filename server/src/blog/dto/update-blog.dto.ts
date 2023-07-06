import { IsEnum, IsNotEmpty, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

import { PublishedStatus } from '@/blog/dto/create-blog.dto';

export class UpdateBlogDto
{
    @IsString()
    @IsNotEmpty()
    @MinLength(2)
    @MaxLength(75)
    @IsOptional()
    public readonly title: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(2)
    @MaxLength(100)
    @IsOptional()
    public readonly metaTitle: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(2)
    @MaxLength(100)
    @IsOptional()
    public readonly slug: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(2)
    @MaxLength(255)
    @IsOptional()
    public readonly summary: string;

    @IsNotEmpty()
    @IsOptional()
    public readonly content: string;

    @IsEnum(PublishedStatus)
    @IsOptional()
    public readonly published: PublishedStatus;
}

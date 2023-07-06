import { IsBoolean, IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateBlogDto
{
    @IsString()
    @IsNotEmpty()
    @MinLength(2)
    @MaxLength(75)
    title: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(2)
    @MaxLength(100)
    meta_title: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(2)
    @MaxLength(100)
    slug: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(2)
    @MaxLength(255)
    summary: string;

    @IsNotEmpty()
    content: string;

    @IsBoolean()
    published: boolean;
}

import { IsEnum, IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export enum PublishedStatus
{
    CONFIRMED = 'Confirmed',
    REJECTED = 'Rejected',
    WAITING = 'Waiting'
}

export class CreateBlogDto
{
    @IsString()
    @IsNotEmpty()
    @MinLength(2)
    @MaxLength(75)
    public readonly title: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(2)
    @MaxLength(100)
    public readonly meta_title: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(2)
    @MaxLength(100)
    public readonly slug: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(2)
    @MaxLength(255)
    public readonly summary: string;

    @IsNotEmpty()
    public readonly content: string;

    @IsEnum(PublishedStatus)
    public readonly published: PublishedStatus;
}

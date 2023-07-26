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
    public readonly titleEN: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(2)
    @MaxLength(75)
    public readonly titleDE: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(2)
    @MaxLength(75)
    public readonly titleFA: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(2)
    @MaxLength(100)
    public readonly metaTitleEN: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(2)
    @MaxLength(100)
    public readonly metaTitleDE: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(2)
    @MaxLength(100)
    public readonly metaTitleFA: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(2)
    @MaxLength(100)
    public readonly slug: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(2)
    @MaxLength(255)
    public readonly summaryEN: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(2)
    @MaxLength(255)
    public readonly summaryDE: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(2)
    @MaxLength(255)
    public readonly summaryFA: string;

    @IsNotEmpty()
    public readonly contentEN: string;

    @IsNotEmpty()
    public readonly contentDE: string;

    @IsNotEmpty()
    public readonly contentFA: string;

    @IsEnum(PublishedStatus)
    public readonly published: PublishedStatus;
}

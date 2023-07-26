import { IsEnum, IsNotEmpty, Length } from 'class-validator';

export enum PublishedStatus
{
    CONFIRMED = 'Confirmed',
    REJECTED = 'Rejected',
    WAITING = 'Waiting'
}

export class CreateBlogDto
{
    @Length(1, 75, { message: '1006' })
    public readonly titleEN: string;

    @Length(1, 75, { message: '1006' })
    public readonly titleDE: string;

    @Length(1, 75, { message: '1006' })
    public readonly titleFA: string;

    @Length(1, 75, { message: '1007' })
    public readonly metaTitleEN: string;

    @Length(1, 75, { message: '1007' })
    public readonly metaTitleDE: string;

    @Length(1, 75, { message: '1007' })
    public readonly metaTitleFA: string;

    @Length(1, 75, { message: '1007' })
    public readonly slugEN: string;

    @Length(1, 75, { message: '1007' })
    public readonly slugDE: string;

    @Length(1, 75, { message: '1007' })
    public readonly slugFA: string;

    @Length(1, 75, { message: '1004' })
    public readonly summaryEN: string;

    @Length(1, 75, { message: '1004' })
    public readonly summaryDE: string;

    @Length(1, 75, { message: '1004' })
    public readonly summaryFA: string;

    @IsNotEmpty({ message: '1005' })
    public readonly contentEN: string;

    @IsNotEmpty({ message: '1005' })
    public readonly contentDE: string;

    @IsNotEmpty({ message: '1005' })
    public readonly contentFA: string;

    @IsEnum(PublishedStatus)
    public readonly published: PublishedStatus;
}

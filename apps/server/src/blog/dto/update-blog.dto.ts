import { IsEnum, IsNotEmpty, IsOptional, Length } from 'class-validator';
import { PublishedStatus } from '@/blog/dto/create-blog.dto';

export class UpdateBlogDto
{
    @Length(1, 75, { message: '1006' })
    @IsOptional()
    public readonly titleEN: string;

    @Length(1, 75, { message: '1006' })
    @IsOptional()
    public readonly titleDE: string;

    @Length(1, 75, { message: '1006' })
    @IsOptional()
    public readonly titleFA: string;

    @Length(1, 75, { message: '1007' })
    @IsOptional()
    public readonly metaTitleEN: string;

    @Length(1, 75, { message: '1007' })
    @IsOptional()
    public readonly metaTitleDE: string;

    @Length(1, 75, { message: '1007' })
    @IsOptional()
    public readonly metaTitleFA: string;

    @Length(1, 75, { message: '1007' })
    @IsOptional()
    public readonly slug: string;

    @Length(1, 75, { message: '1004' })
    @IsOptional()
    public readonly summaryEN: string;

    @Length(1, 75, { message: '1004' })
    @IsOptional()
    public readonly summaryDE: string;

    @Length(1, 75, { message: '1004' })
    @IsOptional()
    public readonly summaryFA: string;

    @IsNotEmpty({ message: '1005' })
    @IsOptional()
    public readonly contentEN: string;

    @IsNotEmpty({ message: '1005' })
    @IsOptional()
    public readonly contentDE: string;

    @IsNotEmpty({ message: '1005' })
    @IsOptional()
    public readonly contentFA: string;

    @IsEnum(PublishedStatus)
    @IsOptional()
    public readonly published: PublishedStatus;
}

import { IsOptional, Length } from 'class-validator';
import { Field } from '@nestjs/graphql';

export class UpdateFeatureDto
{
    @Length(1, 50, { message: '1003' })
    @Field()
    @IsOptional()
    public readonly titleEN: string;

    @Length(1, 50, { message: '1003' })
    @Field()
    @IsOptional()
    public readonly titleDE: string;

    @Length(1, 50, { message: '1003' })
    @Field()
    @IsOptional()
    public readonly titleFA: string;

    @Length(1, 255, { message: '1004' })
    @Field()
    @IsOptional()
    public readonly descriptionEN: string;

    @Length(1, 255, { message: '1004' })
    @Field()
    @IsOptional()
    public readonly descriptionDE: string;

    @Length(1, 255, { message: '1004' })
    @Field()
    @IsOptional()
    public readonly descriptionFA: string;
}

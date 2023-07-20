import { IsOptional, Length } from 'class-validator';
import { Field } from '@nestjs/graphql';

export class UpdateFeatureDto
{
    @Length(1, 50, { message: '1003' })
    @Field()
    @IsOptional()
    public readonly title: string;

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

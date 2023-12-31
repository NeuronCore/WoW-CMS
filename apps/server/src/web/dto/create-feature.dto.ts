import { Length } from 'class-validator';
import { Field } from '@nestjs/graphql';

export class CreateFeatureDto
{
    @Length(1, 50, { message: '1003' })
    @Field()
    public readonly titleEN: string;

    @Length(1, 50, { message: '1003' })
    @Field()
    public readonly titleDE: string;

    @Length(1, 50, { message: '1003' })
    @Field()
    public readonly titleFA: string;

    @Length(1, 255, { message: '1004' })
    @Field()
    public readonly descriptionEN: string;

    @Length(1, 255, { message: '1004' })
    @Field()
    public readonly descriptionDE: string;

    @Length(1, 255, { message: '1004' })
    @Field()
    public readonly descriptionFA: string;
}

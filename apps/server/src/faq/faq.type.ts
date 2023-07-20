import { ObjectType, Field } from '@nestjs/graphql';
import GraphQLJSON from 'graphql-type-json';

@ObjectType('Faq')
export class FaqType
{
    @Field()
    statusCode: number;

    @Field(() => GraphQLJSON)
    data: JSON;

    @Field(() => GraphQLJSON)
    message: JSON;
}

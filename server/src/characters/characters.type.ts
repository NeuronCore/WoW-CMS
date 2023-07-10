import { ObjectType, Field } from '@nestjs/graphql';
import GraphQLJSON from 'graphql-type-json';

@ObjectType('Characters')
export class CharactersType
{
    @Field(() => GraphQLJSON)
    data: JSON;
}

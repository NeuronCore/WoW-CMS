import { ObjectType, Field } from '@nestjs/graphql';
import GraphQLJSON from 'graphql-type-json';

@ObjectType('AccountPassword')
export class AccountPasswordType
{
    @Field(() => GraphQLJSON)
    message: JSON;
}

import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

export const AccountDecorator = createParamDecorator((_data, context: ExecutionContext) =>
{
    const request = GqlExecutionContext.create(context).getContext().req;
    return request.account;
});

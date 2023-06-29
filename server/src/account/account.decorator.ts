import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const AccountDecorator = createParamDecorator((data: unknown, ctx: ExecutionContext) =>
{
    const request = ctx.switchToHttp().getRequest();
    return request.account;
});

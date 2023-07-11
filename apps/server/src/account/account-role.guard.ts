import { Injectable, CanActivate, ExecutionContext, Inject } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Pool } from 'mysql2/promise';

@Injectable()
export class AccountRoleGuard implements CanActivate
{
    constructor(
        private reflector: Reflector,
        @Inject('WEB_DATABASE') private webDatabase: Pool
    )
    { }

    matchRoles(roles: string[], userRole: string): boolean
    {
        return roles.some((role) => role === userRole);
    }

    async canActivate(context: ExecutionContext): Promise<boolean>
    {
        const roles: string[] = this.reflector.get<string[]>('roles', context.getHandler());

        if (!roles)
            return true;

        const request = context.switchToHttp().getRequest();
        const account = request.account;

        const [findAccount] = await this.webDatabase.query('SELECT `role` FROM `account_information` WHERE `id` = ?', [account]);

        return this.matchRoles(roles, findAccount[0].role);
    }
}

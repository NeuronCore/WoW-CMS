import { Resolver, Args, Mutation } from '@nestjs/graphql';

import { AccountPasswordService } from '@/account-password/account-password.service';
import { AccountPasswordType } from '@/account-password/account-password.type';

import { UpdateResetPasswordDto } from '@/account-password/dto/update-reset-password.dto';

@Resolver(() => AccountPasswordType)
export class AccountPasswordResolver
{
    constructor(private readonly accountPasswordService: AccountPasswordService)
    {}

    @Mutation(() => AccountPasswordType)
    public async forgotPassword(@Args('email') email: string)
    {
        return this.accountPasswordService.forgotPassword(email);
    }

    @Mutation(() => AccountPasswordType)
    public async resetPassword(@Args('updateResetPasswordDto') updateResetPasswordDto: UpdateResetPasswordDto, @Args('token') token: string)
    {
        return this.accountPasswordService.resetPassword(updateResetPasswordDto, token);
    }
}

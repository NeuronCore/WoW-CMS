import { Resolver, Args, Mutation, Query } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';

import { AuthGuard } from '@/auth/auth.guard';
import { AccountDecorator } from '@/account/account.decorator';

import { AccountType } from '@/account/account.type';
import { AccountService } from '@/account/account.service';

import { UpdateInformationDto } from '@/account/dto/update-information.dto';

@Resolver(() => AccountType)
export class AccountResolver
{
    constructor(private readonly accountService: AccountService)
    {

    }

    @Query(() => AccountType)
    @UseGuards(AuthGuard)
    public async current(@AccountDecorator() accountID: number)
    {
        return this.accountService.current(accountID);
    }

    @Mutation(() => AccountType)
    @UseGuards(AuthGuard)
    public async updateInformation(@AccountDecorator() accountID: number, @Args('updateInformationDto') updateInformationDto: UpdateInformationDto)
    {
        return this.accountService.updateInformation(accountID, updateInformationDto);
    }
}

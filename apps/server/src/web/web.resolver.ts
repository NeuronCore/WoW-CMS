import { Resolver, Args, Mutation, Query } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';

import { AuthGuard } from '@/auth/auth.guard';
import { Roles } from '@/account/account-role.decorator';
import { AccountRole } from '@/account/account-role.enum';

import { WebType } from '@/web/web.type';
import { WebService } from '@/web/web.service';

import { CreateFaqDto } from '@/web/dto/create-faq.dto';
import { UpdateFaqDto } from '@/web/dto/update-faq.dto';

@Resolver(() => WebType)
export class WebResolver
{
    constructor(private webService: WebService)
    {}

    @Mutation(() => WebType)
    @UseGuards(AuthGuard)
    @Roles(AccountRole.ADMIN, AccountRole.MANAGER)
    public async createFAQ(@Args('createFaqDto') createFaqDto: CreateFaqDto)
    {
        return this.webService.createFAQ(createFaqDto);
    }

    @Query(() => WebType)
    public async findAllFAQ(@Args('locale') locale: string)
    {
        return this.webService.findAllFAQ(locale);
    }

    @Mutation(() => WebType)
    @UseGuards(AuthGuard)
    @Roles(AccountRole.ADMIN, AccountRole.MANAGER)
    public async updateFAQ(@Args('id') id: number, @Args('updateFaqDto') updateFaqDto: UpdateFaqDto)
    {
        return this.webService.updateFAQ(id, updateFaqDto);
    }

    @Mutation(() => WebType)
    @UseGuards(AuthGuard)
    @Roles(AccountRole.ADMIN, AccountRole.MANAGER)
    public async removeFAQ(@Args('id') id: number)
    {
        return this.webService.removeFAQ(id);
    }
}

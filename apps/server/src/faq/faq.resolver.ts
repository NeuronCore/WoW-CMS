import { Resolver, Args, Mutation, Query } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';

import { AuthGuard } from '@/auth/auth.guard';
import { Roles } from '@/account/account-role.decorator';
import { AccountRole } from '@/account/account-role.enum';

import { FaqType } from '@/faq/faq.type';
import { FaqService } from '@/faq/faq.service';

import { CreateFaqDto } from '@/faq/dto/create-faq.dto';
import { UpdateFaqDto } from '@/faq/dto/update-faq.dto';

@Resolver(() => FaqType)
export class FaqResolver
{
    constructor(private faqService: FaqService)
    {}

    @Mutation(() => FaqType)
    @UseGuards(AuthGuard)
    @Roles(AccountRole.ADMIN, AccountRole.MANAGER)
    public async create(@Args('createFaqDto') createFaqDto: CreateFaqDto)
    {
        return this.faqService.create(createFaqDto);
    }

    @Query(() => FaqType)
    public async findAll()
    {
        return this.faqService.findAll();
    }

    @Mutation(() => FaqType)
    @UseGuards(AuthGuard)
    @Roles(AccountRole.ADMIN, AccountRole.MANAGER)
    public async update(@Args('id') id: number, @Args('updateFaqDto') updateFaqDto: UpdateFaqDto)
    {
        return this.faqService.update(id, updateFaqDto);
    }

    @Mutation(() => FaqType)
    @UseGuards(AuthGuard)
    @Roles(AccountRole.ADMIN, AccountRole.MANAGER)
    public async remove(@Args('id') id: number)
    {
        return this.faqService.remove(id);
    }
}

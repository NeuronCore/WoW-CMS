import { Field, InputType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { Length } from 'class-validator';

@InputType()
export class UpdateResetPasswordDto
{
    @ApiProperty()
    @Length(8, 30, { message: '1002' })
    @Field()
    public readonly password: string;

    @ApiProperty()
    @Length(8, 30, { message: '1002' })
    @Field()
    public readonly passwordConfirm: string;
}

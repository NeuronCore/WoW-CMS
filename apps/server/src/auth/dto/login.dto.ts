import { Field, InputType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { Length } from 'class-validator';

@InputType()
export class LoginDto
{
    @ApiProperty()
    @Length(1, 30, { message: '1000' })
    @Field()
    public readonly username: string;

    @ApiProperty()
    @Length(8, 30, { message: '1002' })
    @Field()
    public readonly password: string;
}

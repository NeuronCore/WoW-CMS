import { Field, InputType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

@InputType()
export class UpdateEmailDto
{
    @ApiProperty()
    @IsEmail()
    @Field()
    public readonly email: string;

    @ApiProperty()
    @IsNotEmpty()
    @Field()
    public readonly currentPassword: string;
}

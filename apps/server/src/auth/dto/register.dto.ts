import { Field, InputType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, Length } from 'class-validator';

@InputType()
export class RegisterDto
{
    @ApiProperty()
    @Length(1, 30, { message: '1000' })
    @Field()
    public readonly firstName: string;

    @ApiProperty()
    @Length(1, 30, { message: '1000' })
    @Field()
    public readonly lastName: string;

    @ApiProperty()
    @Length(1, 30, { message: '1000' })
    @Field()
    public readonly username: string;

    @ApiProperty()
    @IsEmail({}, { message: '1001' })
    @Field()
    public readonly email: string;

    @ApiProperty()
    @Length(8, 30, { message: '1002' })
    @Field()
    public readonly password: string;

    @ApiProperty()
    @Length(8, 30, { message: '1002' })
    @Field()
    public readonly confirmPassword: string;
}

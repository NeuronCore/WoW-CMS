import { Field, InputType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';

@InputType()
export class RegisterDto
{
    @ApiProperty()
    @IsString()
    @MinLength(2)
    @MaxLength(20)
    @Field()
    public readonly firstName: string;

    @ApiProperty()
    @IsString()
    @MinLength(2)
    @MaxLength(20)
    @Field()
    public readonly lastName: string;

    @ApiProperty()
    @IsString()
    @MinLength(4)
    @MaxLength(20)
    @Field()
    public readonly username: string;

    @ApiProperty()
    @IsString()
    @IsEmail()
    @Field()
    public readonly email: string;

    @ApiProperty()
    @IsString()
    @MinLength(4)
    @MaxLength(30)
    @Field()
    public readonly password: string;

    @ApiProperty()
    @IsString()
    @MinLength(4)
    @MaxLength(30)
    @Field()
    public readonly confirmPassword: string;
}

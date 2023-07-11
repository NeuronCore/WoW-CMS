import { Field, InputType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

@InputType()
export class UpdateResetPasswordDto
{
    @ApiProperty()
    @IsNotEmpty()
    @MinLength(5)
    @MaxLength(32)
    @Field()
    public readonly password: string;

    @ApiProperty()
    @IsString()
    @Field()
    public readonly passwordConfirm: string;
}

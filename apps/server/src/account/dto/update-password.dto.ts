import { Field, InputType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MaxLength, MinLength } from 'class-validator';

@InputType()
export class UpdatePasswordDto
{
    @ApiProperty()
    @IsNotEmpty()
    @Field()
    public readonly currentPassword: string;

    @ApiProperty()
    @IsNotEmpty()
    @MinLength(5)
    @MaxLength(32)
    @Field()
    public readonly newPassword: string;

    @ApiProperty()
    @IsNotEmpty()
    @MinLength(5)
    @MaxLength(32)
    @Field()
    public readonly newPasswordConfirm: string;
}

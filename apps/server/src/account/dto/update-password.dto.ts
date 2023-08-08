import { Field, InputType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Length } from 'class-validator';

@InputType()
export class UpdatePasswordDto
{
    @ApiProperty()
    @IsNotEmpty({ message: '1005' })
    @Field()
    public readonly currentPassword: string;

    @ApiProperty()
    @Length(8, 30, { message: '1002' })
    @Field()
    public readonly newPassword: string;

    @ApiProperty()
    @Length(8, 30, { message: '1002' })
    @Field()
    public readonly newConfirmPassword: string;
}

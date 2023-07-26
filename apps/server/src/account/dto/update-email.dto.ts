import { Field, InputType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

@InputType()
export class UpdateEmailDto
{
    @ApiProperty()
    @IsEmail({}, { message: '1001' })
    @Field()
    public readonly email: string;

    @ApiProperty()
    @IsNotEmpty({ message: '1005' })
    @Field()
    public readonly currentPassword: string;
}

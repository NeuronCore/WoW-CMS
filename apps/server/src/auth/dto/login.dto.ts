import { Field, InputType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

@InputType()
export class LoginDto
{
    @ApiProperty()
    @IsString()
    @Field()
    public readonly username: string;

    @ApiProperty()
    @IsString()
    @Field()
    public readonly password: string;
}

import { ApiProperty } from '@nestjs/swagger';
import { Length } from 'class-validator';

export class CreateCommentDto
{
    @ApiProperty()
    @Length(8, 30, { message: '1002' })
    public content: string;
}

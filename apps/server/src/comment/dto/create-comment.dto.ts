import { ApiProperty } from '@nestjs/swagger';
import { Length } from 'class-validator';

export class CreateCommentDto
{
    @ApiProperty()
    @Length(8, 255, { message: '1004' })
    public content: string;
}

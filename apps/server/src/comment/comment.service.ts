import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { Pool } from 'mysql2/promise';

import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Injectable()
export class CommentService
{
    constructor(@Inject('WEB_DATABASE') private webDatabase: Pool)
    { }

    public async create(accountID: number, blogID: number, createCommentDto: CreateCommentDto)
    {
        const [blog] = await this.webDatabase.query('SELECT null FROM `blog` WHERE `id` = ?', [blogID]);
        if (!blog[0])
            return { statusCode: HttpStatus.NOT_FOUND, message: 'Blog not found' };

        await this.webDatabase.execute('INSERT INTO `comments` (`account`, `blog_id`, `content`) VALUES (?, ?, ?)', [accountID, blogID, createCommentDto.content]);

        return { statusCode: HttpStatus.CREATED, message: 'Comment created' };
    }

    public async reply(accountID: number, commentID: number, createCommentDto: CreateCommentDto)
    {
        const [comment] = await this.webDatabase.query('SELECT `account`, `blog_id` FROM `comments` WHERE `id` = ?', [commentID]);
        if (!comment[0])
            return { statusCode: HttpStatus.NOT_FOUND, message: 'Comment not found' };

        await this.webDatabase.execute('INSERT INTO `comments` (`account`, `blog_id`, `reply_of`, `content`) VALUES (?, ?, ?, ?)', [accountID, comment[0].blog_id, commentID, createCommentDto.content]);

        return { statusCode: HttpStatus.CREATED, message: 'Reply created' };
    }

    public async update(accountID: number, commentID: number, updateCommentDto: UpdateCommentDto)
    {
        const [comment] = await this.webDatabase.query('SELECT `content` FROM `comments` WHERE `id` = ? AND `account` = ?', [commentID, accountID]);
        if (!comment[0])
            return { statusCode: HttpStatus.NOT_FOUND, message: 'Comment not found' };

        await this.webDatabase.execute('UPDATE `comments` SET `content` = ? WHERE `id` = ?', [updateCommentDto.content, commentID]);

        return { statusCode: HttpStatus.OK, message: 'Updated' };
    }

    public async remove(accountID: number, commentID: number)
    {
        const [comment] = await this.webDatabase.query('SELECT `content` FROM `comments` WHERE `id` = ? AND `account` = ?', [commentID, accountID]);
        if (!comment[0])
            return { statusCode: HttpStatus.NOT_FOUND, message: 'Comment not found' };

        await this.webDatabase.execute('DELETE FROM `comments` WHERE `id` = ?', [commentID]);

        return { statusCode: HttpStatus.OK, message: 'Deleted' };
    }

    public async findAll(blogID: number, page = 1, limit = 10)
    {
        const sql =
        `
            SELECT
                *
            FROM
                comments
            WHERE
                blog_id = ? AND reply_of = 0
            ORDER BY
                created_at DESC
            LIMIT ${ page - 1 }, ${ limit };
        `;
        const [comments]: any = await this.webDatabase.query(sql, [blogID]);

        return { statusCode: HttpStatus.OK, data: { totals: comments.length, comments } };
    }

    public async findAllReplies(commentID: number, page = 1, limit = 10)
    {
        const sql =
        `
            SELECT
                *
            FROM
                comments
            WHERE
                reply_of = ?
            ORDER BY
                created_at DESC
            LIMIT ${ page - 1 }, ${ limit };
        `;
        const [replies]: any = await this.webDatabase.query(sql, [commentID]);

        return { statusCode: HttpStatus.OK, data: { totals: replies.length, replies } };
    }
}

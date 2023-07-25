import { BadRequestException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { Pool } from 'mysql2/promise';

import { VoteType } from '@/shared/enums';

import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Injectable()
export class CommentService
{
    constructor(@Inject('WEB_DATABASE') private webDatabase: Pool)
    { }

    /**
     *
     * @param accountID
     * @param blogID
     * @param createCommentDto
     *
     * @description
     *      code:
     *          2007 - Blog with this id not found
     */
    public async create(accountID: number, blogID: number, createCommentDto: CreateCommentDto)
    {
        const [blog] = await this.webDatabase.query('SELECT null FROM `blog` WHERE `id` = ?', [blogID]);
        if (!blog[0])
            return { statusCode: HttpStatus.NOT_FOUND, message: [{ field: 'all', code: '2007' }] };

        await this.webDatabase.execute('INSERT INTO `comments` (`account`, `blog_id`, `content`) VALUES (?, ?, ?)', [accountID, blogID, createCommentDto.content]);

        return { statusCode: HttpStatus.CREATED, message: 'Comment created' };
    }

    /**
     *
     * @param accountID
     * @param commentID
     * @param createCommentDto
     *
     * @description
     *      code:
     *          2010 - Comment with this id not found
     */
    public async reply(accountID: number, commentID: number, createCommentDto: CreateCommentDto)
    {
        const [comment] = await this.webDatabase.query('SELECT `account`, `blog_id` FROM `comments` WHERE `id` = ?', [commentID]);
        if (!comment[0])
            return { statusCode: HttpStatus.NOT_FOUND, message: [{ field: 'all', code: '2010' }] };

        await this.webDatabase.execute('INSERT INTO `comments` (`account`, `blog_id`, `reply_of`, `content`) VALUES (?, ?, ?, ?)', [accountID, comment[0].blog_id, commentID, createCommentDto.content]);

        return { statusCode: HttpStatus.CREATED, message: 'Reply created' };
    }

    /**
     *
     * @param accountID
     * @param commentID
     * @param updateCommentDto
     *
     * @description
     *      code:
     *          2010 - Comment with this id not found
     */
    public async update(accountID: number, commentID: number, updateCommentDto: UpdateCommentDto)
    {
        const [comment] = await this.webDatabase.query('SELECT `content` FROM `comments` WHERE `id` = ? AND `account` = ?', [commentID, accountID]);
        if (!comment[0])
            return { statusCode: HttpStatus.NOT_FOUND, message: [{ field: 'all', code: '2010' }] };

        await this.webDatabase.execute('UPDATE `comments` SET `content` = ? WHERE `id` = ?', [updateCommentDto.content, commentID]);

        return { statusCode: HttpStatus.OK, message: 'Updated' };
    }

    /**
     *
     * @param accountID
     * @param commentID
     *
     * @description
     *      code:
     *          2010 - Comment with this id not found
     */
    public async remove(accountID: number, commentID: number)
    {
        const [comment] = await this.webDatabase.query('SELECT null FROM `comments` WHERE `id` = ? AND `account` = ?', [commentID, accountID]);
        if (!comment[0])
            return { statusCode: HttpStatus.NOT_FOUND, message: [{ field: 'all', code: '2010' }] };

        await this.webDatabase.execute('DELETE FROM `comments` WHERE `id` = ?', [commentID]);

        return { statusCode: HttpStatus.OK, message: 'Deleted' };
    }

    /**
     *
     * @param accountID
     * @param commentID
     * @param voteType
     *
     * @description
     *      code:
     *          2010 - Comment with this id not found
     */
    public async vote(accountID: number, commentID: number, voteType: VoteType)
    {
        const [comment] = await this.webDatabase.query('SELECT null FROM `comments` WHERE `id` = ?', [commentID]);
        if (!comment[0])
            return { statusCode: HttpStatus.NOT_FOUND, message: [{ field: 'all', code: '2010' }] };

        if (!Object.values(VoteType)?.includes(voteType))
            throw new BadRequestException({ statusCode: HttpStatus.BAD_REQUEST, message: 'Invalid Vote Type' });

        if (voteType === VoteType.UP)
        {
            await this.webDatabase.execute('REPLACE INTO `votes` (`account`, `comment_id`, `vote`) VALUES (?, ?, ?)', [accountID, commentID, 1]);
            return { statusCode: HttpStatus.OK, message: 'Increased' };
        }
        else if (voteType === VoteType.DOWN)
        {
            await this.webDatabase.execute('REPLACE INTO `votes` (`account`, `comment_id`, `vote`) VALUES (?, ?, ?)', [accountID, commentID, -1]);
            return { statusCode: HttpStatus.OK, message: 'Decreased' };
        }
    }

    public async findAll(blogID: number, page = 1, limit = 10)
    {
        const sql =
        `
            SELECT
                *,
                (SELECT SUM(votes.vote) FROM votes WHERE votes.comment_id = comments.id) AS votes
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
                *,
                (SELECT SUM(votes.vote) FROM votes WHERE votes.comment_id = comments.id) AS votes
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

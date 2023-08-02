import { BadRequestException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { Pool } from 'mysql2/promise';

import { VoteType } from '@/shared/enums';

import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Injectable()
export class CommentService
{
    constructor(
        @Inject('AUTH_DATABASE') private authDatabase: Pool,
        @Inject('WEB_DATABASE') private webDatabase: Pool
    )
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
        await this.webDatabase.execute('DELETE FROM `comments` WHERE `reply_of` = ?', [commentID]);

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
                (SELECT SUM(votes.vote) FROM votes WHERE votes.comment_id = comments.id) AS votes,
                (SELECT avatar FROM account_information WHERE account_information.id = comments.account) AS avatar
            FROM
                comments
            WHERE
                blog_id = ? AND reply_of = 0
            ORDER BY
                created_at DESC
            LIMIT ${ page - 1 }, ${ limit };
        `;
        const [comments]: any = await this.webDatabase.query(sql, [blogID]);
        const [commentsCount] = await this.webDatabase.query('SELECT COUNT(id) AS totals FROM `comments`');

        for (const comment of comments)
        {
            const [account] = await this.authDatabase.query('SELECT `username` FROM `account` WHERE `id` = ?', [comment.account]);
            comment.username = account[0].username;

            const [isVoted] = await this.webDatabase.query('SELECT `vote` FROM `votes` WHERE `account` = ? AND `comment_id` = ?', [comment.account, comment.id]);
            switch (isVoted[0]?.vote)
            {
                case 1:
                    comment.isVoted = VoteType.UP;
                    break;
                case -1:
                    comment.isVoted = VoteType.DOWN;
                    break;
                default:
                    comment.isVoted = null;
                    break;
            }

            const sql =
            `
                SELECT
                    *,
                    (SELECT SUM(votes.vote) FROM votes WHERE votes.comment_id = comments.id) AS votes,
                    (SELECT avatar FROM account_information WHERE account_information.id = comments.account) AS avatar
                FROM
                    comments
                WHERE
                    reply_of = ?
                ORDER BY
                    created_at DESC
            `;
            const [commentReplies]: any = await this.webDatabase.query(sql, [comment.id]);

            for (const reply of commentReplies)
            {
                const [account] = await this.authDatabase.query('SELECT `username` FROM `account` WHERE `id` = ?', [reply.account]);
                reply.username = account[0].username;
            }

            comment.replies = commentReplies;
        }

        return { statusCode: HttpStatus.OK, data: { ...commentsCount[0], hasMore: Number(page) < Math.ceil(commentsCount[0].totals / Number(limit)), comments } };
    }
}

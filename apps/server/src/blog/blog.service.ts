import * as path from 'path';

import { BadRequestException, HttpStatus, Inject, Injectable, Logger } from '@nestjs/common';
import { Pool } from 'mysql2/promise';

import * as sharp from 'sharp';
import * as ip from 'ip';

import { BlogFindAll, Locale } from '@/shared/enums';
import { Helper } from '@/utils/helper.util';

import { CreateBlogDto, PublishedStatus } from './dto/create-blog.dto';
import { UpdateBlogDto } from '@/blog/dto/update-blog.dto';

@Injectable()
export class BlogService
{
    private logger: Logger = new Logger(BlogService.name);

    constructor(
        @Inject('AUTH_DATABASE') private authDatabase: Pool,
        @Inject('WEB_DATABASE') private webDatabase: Pool
    )
    { }

    /**
     *
     * @param accountID
     * @param createBlogDto
     * @param thumbnail
     *
     * @description
     *      code:
     *          1004 - Must be longer than or equal to 1 and shorter than or equal to 255 characters
     *          1005 - Should not be empty
     *          1006 - Must be longer than or equal to 1 and shorter than or equal to 75 characters
     *          1007 - Must be longer than or equal to 1 and shorter than or equal to 100 characters
     *          2006 - Slug already exists
     *          2027 - The blog was created successfully
     */
    public async create(accountID: number, createBlogDto: CreateBlogDto, thumbnail: Express.Multer.File)
    {
        try
        {
            const { titleEN, titleDE, titleFA, metaTitleEN, metaTitleDE, metaTitleFA, slugEN, slugDE, slugFA, summaryEN, summaryDE, summaryFA, contentEN, contentDE, contentFA, published } = createBlogDto;

            const originalName = path.parse(thumbnail.originalname).name;
            const filename = accountID + '-' + 'thumbnail' + '-' + Date.now() + '-' + originalName + '.jpg';

            await sharp(thumbnail.buffer).toFile(path.join('uploads/thumbnail', filename));

            const [blog] = await this.webDatabase.query('SELECT `slug_en`, `slug_de`, `slug_fa` FROM `blog` WHERE `slug_en` = ? OR `slug_de` = ? OR `slug_fa` = ?', [Helper.stringToSlug(slugEN), Helper.stringToSlug(slugDE), Helper.stringToSlug(slugFA)]);
            if (blog[0]?.slug_en || blog[0]?.slug_de || blog[0]?.slug_fa)
                return { statusCode: HttpStatus.CONFLICT, message: [{ field: 'all', code: '2006' }] };

            const sql =
            `
                INSERT INTO
                    blog (account,
                          title_en, title_de, title_fa,
                          meta_title_en, meta_title_de, meta_title_fa,
                          slug_en, slug_de, slug_fa,
                          thumbnail,
                          summary_en, summary_de, summary_fa,
                          content_en, content_de, content_fa,
                          published, published_at)
               VALUES
                    (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ? ,?)
            `;

            await this.webDatabase.execute
            (
                sql,
                [
                    accountID,
                    titleEN, titleDE, titleFA,
                    metaTitleEN, metaTitleDE, metaTitleFA,
                    Helper.stringToSlug(slugEN), Helper.stringToSlug(slugDE), Helper.stringToSlug(slugFA),
                    filename,
                    summaryEN, summaryDE, summaryFA,
                    contentEN, contentDE, contentFA,
                    published, published === PublishedStatus.CONFIRMED ? new Date(Date.now()) : null
                ]
            );

            return { statusCode: HttpStatus.OK, message: [{ field: 'successfully', code: '2027' }] };
        }
        catch (exception)
        {
            this.logger.error(exception);

            if (exception)
                throw new BadRequestException([{ field: 'all', code: '2016' }]);
        }
    }

    /**
     *
     * @param accountID
     * @param id
     * @param updateBlogDto
     * @param thumbnail
     *
     * @description
     *      code:
     *          1004 - Must be longer than or equal to 1 and shorter than or equal to 255 characters
     *          1005 - Should not be empty
     *          1006 - Must be longer than or equal to 1 and shorter than or equal to 75 characters
     *          1007 - Must be longer than or equal to 1 and shorter than or equal to 100 characters
     *          2006 - Slug already exists
     *          2007 - Blog with this id not found
     *          2028 - Blog with this id not found
     */
    public async update(accountID: number, id: number, updateBlogDto: UpdateBlogDto, thumbnail: Express.Multer.File)
    {
        try
        {
            const { titleEN, titleDE, titleFA, metaTitleEN, metaTitleDE, metaTitleFA, slugEN, slugDE, slugFA, summaryEN, summaryDE, summaryFA, contentEN, contentDE, contentFA, published } = updateBlogDto;

            const [blog] = await this.webDatabase.query('SELECT * FROM `blog` WHERE `id` = ?', [id]);
            if (!blog[0])
                return { statusCode: HttpStatus.NOT_FOUND, message: [{ field: 'all', code: '2007' }] };

            if (blog[0].slug_en === Helper.stringToSlug(slugEN) || blog[0].slug_de === Helper.stringToSlug(slugDE) || blog[0].slug_fa === Helper.stringToSlug(slugFA))
                return { statusCode: HttpStatus.CONFLICT, message: [{ field: 'all', code: '2006' }] };

            let filename = null;
            if (thumbnail)
            {
                const originalName = path.parse(thumbnail.originalname).name;
                filename = accountID + '-' + 'thumbnail' + '-' + Date.now() + '-' + originalName + '.jpg';

                await sharp(thumbnail.buffer).toFile(path.join('uploads/thumbnail', filename));
            }

            const sql =
            `
                UPDATE
                    blog
                SET
                      title_en, title_de, title_fa,
                      meta_title_en, meta_title_de, meta_title_fa,
                      slug, thumbnail,
                      summary_en, summary_de, summary_fa,
                      content_en, content_de, content_fa,
                      published, published_at
                WHERE
                    id = ?
            `;

            await this.webDatabase.execute
            (
                sql,
                [
                    titleEN || blog[0].title_en, titleDE || blog[0].title_de, titleFA || blog[0].title_fa,
                    metaTitleEN || blog[0].meta_title_en, metaTitleDE || blog[0].meta_title_de, metaTitleFA || blog[0].meta_title_fa,
                    Helper.stringToSlug(slugEN) || blog[0].slug_en, Helper.stringToSlug(slugDE) || blog[0].slug_de, Helper.stringToSlug(slugFA) || blog[0].slug_fa,
                    filename || blog[0].thumbnail,
                    summaryEN || blog[0].summary_en, summaryDE || blog[0].summary_de, summaryFA || blog[0].summary_fa,
                    contentEN || blog[0].content_en, contentDE || blog[0].content_de, contentFA || blog[0].content_fa,
                    published || blog[0].published, published === PublishedStatus.CONFIRMED ? new Date(Date.now()) : blog[0].published_at, id
                ]
            );

            return { statusCode: HttpStatus.OK, message: [{ field: 'successfully', code: '2028' }] };
        }
        catch (exception)
        {
            this.logger.error(exception);
        }
    }

    /**
     *
     * @param id
     *
     * @description
     *      code:
     *          2007 - Blog with this id not found
     *          2029 - The blog has been successfully deleted
     */
    public async remove(id: number)
    {
        try
        {
            const [blog] = await this.webDatabase.query('SELECT `id` FROM `blog` WHERE `id` = ?', [id]);
            if (!blog[0])
                return { statusCode: HttpStatus.NOT_FOUND, message: [{ field: 'all', code: '2007' }] };

            await this.webDatabase.execute('DELETE FROM `blog` WHERE `id` = ?', [id]);

            return { statusCode: HttpStatus.OK, message: [{ field: 'successfully', code: '2029' }] };
        }
        catch (exception)
        {
            this.logger.error(exception);
        }
    }

    /**
     *
     * @param accountID
     * @param blogID
     *
     * @description
     *      code:
     *          2007 - Blog with this id not found
     *          2008 - Blog unliked
     *          2009 - Blog liked
     */
    public async toggleLike(accountID: number, blogID: number)
    {
        const [blog] = await this.webDatabase.query('SELECT `id` FROM `blog` WHERE `id` = ?', [blogID]);
        if (!blog[0])
            return { statusCode: HttpStatus.NOT_FOUND, message: [{ field: 'all', code: '2007' }] };

        const [likes] = await this.webDatabase.query('SELECT * FROM `likes` WHERE `account` = ? AND `blog_id` = ?', [accountID, blogID]);
        if (likes[0])
        {
            await this.webDatabase.execute('DELETE FROM `likes` WHERE `account` = ? AND `blog_id` = ?', [accountID, blogID]);
            return { statusCode: HttpStatus.OK, message: [{ field: 'all', code: '2008' }] };
        }

        await this.webDatabase.execute('INSERT INTO `likes` (`account`, `blog_id`) VALUES (?, ?)', [accountID, blogID]);

        return { statusCode: HttpStatus.CREATED, message: [{ field: 'all', code: '2009' }] };
    }

    public async findBySlug(slug: string, accountID: number, locale: Locale)
    {
        if (!Object.values(Locale)?.includes(locale))
            throw new BadRequestException({ statusCode: HttpStatus.BAD_REQUEST, message: 'Invalid Locale' });

        try
        {
            const sql =
            `
                SELECT
                    (SELECT COUNT(likes.blog_id) FROM likes WHERE blog.id = likes.blog_id) AS likes,
                    (SELECT COUNT(blog_reads.blog_id) FROM blog_reads WHERE blog.id = blog_reads.blog_id) AS readz,
                    (SELECT COUNT(comments.blog_id) FROM comments WHERE blog.id = comments.blog_id) AS comments,
                    (SELECT avatar FROM account_information WHERE account_information.id = blog.account) AS avatar,
                    id, account,
                    title_${ locale }, meta_title_${ locale },
                    slug_${ locale },
                    thumbnail,
                    summary_${ locale }, content_${ locale },
                    published, published_at, created_at, updated_at
                FROM
                    blog
                WHERE
                    blog.slug_${ locale } = ?
            `;
            const [blog] = await this.webDatabase.query(sql, [slug]);

            const [account] = await this.authDatabase.query('SELECT `username` FROM `account` WHERE `id` = ?', [blog[0].account]);

            if (accountID)
            {
                const [isLiked] = await this.webDatabase.query('SELECT null FROM `likes` WHERE `account` = ? AND `blog_id` = ?', [accountID, blog[0].id]);
                blog[0].isLiked = !!isLiked[0];
            }

            const privateIP = ip.address('private');

            const [blogReads] = await this.webDatabase.query('SELECT null FROM `blog_reads` WHERE `blog_id` = ? AND `ip` = ?', [blog[0].id, privateIP]);
            if (!blogReads[0])
                await this.webDatabase.execute('INSERT INTO `blog_reads` (`blog_id`, `ip`) VALUES (?, ?)', [blog[0].id, privateIP]);

            return { statusCode: HttpStatus.OK, data: { blog: { ...blog[0], ...account[0] }}};
        }
        catch (exception)
        {
            return { statusCode: HttpStatus.CONFLICT, message: [{ field: 'all', code: '2030' }] };
        }
    }

    public async findAllAndOrder(locale: Locale, type: BlogFindAll, page = 1, limit = 20)
    {
        if (!Object.values(Locale)?.includes(locale))
            throw new BadRequestException({ statusCode: HttpStatus.BAD_REQUEST, message: 'Invalid Locale' });

        if (!Object.values(BlogFindAll)?.includes(type))
            throw new BadRequestException({ statusCode: HttpStatus.BAD_REQUEST, message: 'Invalid Type' });

        const sql =
        `
            SELECT
                (SELECT COUNT(likes.blog_id) FROM likes WHERE blog.id = likes.blog_id) AS likes,
                (SELECT COUNT(blog_reads.blog_id) FROM blog_reads WHERE blog.id = blog_reads.blog_id) AS readz,
                (SELECT COUNT(comments.blog_id) FROM comments WHERE blog.id = comments.blog_id) AS comments,
                id,
                title_${ locale }, meta_title_${ locale },
                slug_${ locale },
                thumbnail,
                summary_${ locale },
                published, published_at
            FROM
                blog
            ORDER BY
                ${ type } DESC
            LIMIT ${ page - 1 }, ${ limit };
        `;
        const [blogs]: any = await this.webDatabase.query(sql);
        const [blogsCount] = await this.webDatabase.query('SELECT COUNT(id) AS totals FROM `blog`');

        return { statusCode: HttpStatus.OK, data: { ...blogsCount[0], hasMore: Number(page) < Math.ceil(blogsCount[0].totals / Number(limit)), blogs } };
    }

    public async searchInContentAndSummary(locale: Locale, search: string, page = 1, limit = 20)
    {
        if (!Object.values(Locale)?.includes(locale))
            throw new BadRequestException({ statusCode: HttpStatus.BAD_REQUEST, message: 'Invalid Locale' });

        const sql =
        `
            SELECT
                (SELECT COUNT(likes.blog_id) FROM likes WHERE blog.id = likes.blog_id) AS likes,
                (SELECT COUNT(blog_reads.blog_id) FROM blog_reads WHERE blog.id = blog_reads.blog_id) AS readz,
                (SELECT COUNT(comments.blog_id) FROM comments WHERE blog.id = comments.blog_id) AS comments,
                id,
                title_${ locale }, meta_title_${ locale },
                slug_${ locale },
                thumbnail,
                summary_${ locale },
                published, published_at
            FROM
                blog
            WHERE 
                content_${ locale }
            OR
                summary_${ locale }
            LIKE '%${ search }%'
            LIMIT ${ page - 1 }, ${ limit }
        `;
        const [blogs] = await this.webDatabase.query(sql);
        const [blogsCount] = await this.webDatabase.query('SELECT COUNT(id) AS totals FROM `blog`');

        return { statusCode: HttpStatus.OK, data: { ...blogsCount[0], hasMore: Number(page) < Math.ceil(blogsCount[0].totals / Number(limit)), blogs } };
    }
}
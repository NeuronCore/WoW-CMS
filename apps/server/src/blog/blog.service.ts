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

    constructor(@Inject('WEB_DATABASE') private webDatabase: Pool)
    { }

    public async create(accountID: number, createBlogDto: CreateBlogDto, thumbnail: Express.Multer.File)
    {
        try
        {
            const { titleEN, titleDE, titleFA, metaTitleEN, metaTitleDE, metaTitleFA, slug, summaryEN, summaryDE, summaryFA, contentEN, contentDE, contentFA, published } = createBlogDto;

            const originalName = path.parse(thumbnail.originalname).name;
            const filename = accountID + '-' + 'thumbnail' + '-' + Date.now() + '-' + originalName + '.jpg';

            await sharp(thumbnail.buffer).toFile(path.join('uploads/thumbnail', filename));

            const [blog] = await this.webDatabase.query('SELECT `slug` FROM `blog` WHERE `slug` = ?', [Helper.stringToSlug(slug)]);
            if (blog[0]?.slug)
                return { statusCode: HttpStatus.CONFLICT, message: 'Slug already exists' };

            const sql =
            `
                INSERT INTO
                    blog (account,
                          title_en, title_de, title_fa,
                          meta_title_en, meta_title_de, meta_title_fa,
                          slug, thumbnail,
                          summary_en, summary_de, summary_fa,
                          content_en, content_de, content_fa,
                          published, published_at)
               VALUES
                    (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            `;

            await this.webDatabase.execute
            (
                sql,
                [
                    accountID,
                    titleEN, titleDE || null, titleFA || null,
                    metaTitleEN, metaTitleDE || null, metaTitleFA || null,
                    Helper.stringToSlug(slug), filename,
                    summaryEN, summaryDE || null, summaryFA || null,
                    contentEN, contentDE || null, contentFA || null,
                    published, published === PublishedStatus.CONFIRMED ? new Date(Date.now()) : null
                ]
            );

            return { statusCode: HttpStatus.OK, message: 'The blog was created successfully' };
        }
        catch (exception)
        {
            this.logger.error(exception);

            if (exception)
                throw new BadRequestException('You are only allowed to upload images.');
        }
    }

    public async update(accountID: number, id: number, updateBlogDto: UpdateBlogDto, thumbnail: Express.Multer.File)
    {
        try
        {
            const { titleEN, titleDE, titleFA, metaTitleEN, metaTitleDE, metaTitleFA, slug, summaryEN, summaryDE, summaryFA, contentEN, contentDE, contentFA, published } = updateBlogDto;

            const [blog] = await this.webDatabase.query('SELECT * FROM `blog` WHERE `id` = ?', [id]);
            if (!blog[0])
                return { statusCode: HttpStatus.NOT_FOUND, message: 'Blog with this id not found' };

            if (blog[0].slug === Helper.stringToSlug(slug))
                return { statusCode: HttpStatus.CONFLICT, message: 'Slug already exists' };

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
                    Helper.stringToSlug(slug) || blog[0].slug, filename || blog[0].thumbnail,
                    summaryEN || blog[0].summary_en, summaryDE || blog[0].summary_de, summaryFA || blog[0].summary_fa,
                    contentEN || blog[0].content_en, contentDE || blog[0].content_de, contentFA || blog[0].content_fa,
                    published || blog[0].published, published === PublishedStatus.CONFIRMED ? new Date(Date.now()) : blog[0].published_at, id
                ]
            );

            return { statusCode: HttpStatus.OK, message: 'Blog updated successfully' };
        }
        catch (exception)
        {
            this.logger.error(exception);
        }
    }

    public async remove(id: number)
    {
        try
        {
            const [blog] = await this.webDatabase.query('SELECT `id` FROM `blog` WHERE `id` = ?', [id]);
            if (!blog[0])
                return { statusCode: HttpStatus.NOT_FOUND, message: 'Blog with this id not found' };

            await this.webDatabase.execute('DELETE FROM `blog` WHERE `id` = ?', [id]);

            return { statusCode: HttpStatus.OK, message: 'The blog has been successfully deleted' };
        }
        catch (exception)
        {
            this.logger.error(exception);
        }
    }

    public async toggleLike(accountID: number, blogID: number)
    {
        const [blog] = await this.webDatabase.query('SELECT `id` FROM `blog` WHERE `id` = ?', [blogID]);
        if (!blog[0])
            return { statusCode: HttpStatus.NOT_FOUND, message: 'Blog not found' };

        const [likes] = await this.webDatabase.query('SELECT * FROM `likes` WHERE `account` = ? AND `blog_id` = ?', [accountID, blogID]);
        if (likes[0])
        {
            await this.webDatabase.execute('DELETE FROM `likes` WHERE `account` = ? AND `blog_id` = ?', [accountID, blogID]);
            return { statusCode: HttpStatus.OK, message: 'Blog unliked' };
        }

        await this.webDatabase.execute('INSERT INTO `likes` (`account`, `blog_id`) VALUES (?, ?)', [accountID, blogID]);

        return { statusCode: HttpStatus.CREATED, message: 'Blog liked' };
    }

    public async findBySlug(slug: string, locale: Locale)
    {
        if (!Object.values(Locale)?.includes(locale))
            throw new BadRequestException({ statusCode: HttpStatus.BAD_REQUEST, message: 'Invalid Locale' });

        const sql =
        `
            SELECT
                (SELECT COUNT(likes.blog_id) FROM likes WHERE blog.id = likes.blog_id) AS likes,
                (SELECT COUNT(blog_reads.blog_id) FROM blog_reads WHERE blog.id = blog_reads.blog_id) AS readz,
                id, account, parent_id,
                title_${ locale }, meta_title_${ locale },
                slug, thumbnail,
                summary_${ locale }, content_${ locale },
                published, published_at, created_at, updated_at
            FROM
                blog
            WHERE
                blog.slug = ?
        `;
        const [blog] = await this.webDatabase.query(sql, [slug]);

        const privateIP = ip.address('private');

        if (blog[0])
        {
            const [blogReads] = await this.webDatabase.query('SELECT null FROM `blog_reads` WHERE `blog_id` = ? AND `ip` = ?', [blog[0].id, privateIP]);
            if (!blogReads[0])
                await this.webDatabase.execute('INSERT INTO `blog_reads` (`blog_id`, `ip`) VALUES (?, ?)', [blog[0].id, privateIP]);
        }

        return { statusCode: HttpStatus.OK, data: { blog: blog[0] } };
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
                id,
                title_${ locale }, meta_title_${ locale },
                slug, thumbnail,
                summary_${ locale },
                published, published_at
            FROM
                blog
            ORDER BY
                ${ type } DESC
            LIMIT ${ page - 1 }, ${ limit };
        `;
        const [blogs]: any = await this.webDatabase.query(sql);

        return { statusCode: HttpStatus.OK, data: { totals: blogs.length, blogs } };
    }
}

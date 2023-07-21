import * as path from 'path';

import { BadRequestException, HttpStatus, Inject, Injectable, Logger } from '@nestjs/common';
import { Pool } from 'mysql2/promise';

import * as sharp from 'sharp';

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
            const { title, metaTitle, slug, summary, content, published } = createBlogDto;

            const originalName = path.parse(thumbnail.originalname).name;
            const filename = accountID + '-' + 'thumbnail' + '-' + Date.now() + '-' + originalName + '.jpg';

            await sharp(thumbnail.buffer).toFile(path.join('uploads/thumbnail', filename));

            const [blog] = await this.webDatabase.query('SELECT `slug` FROM `blog` WHERE `slug` = ?', [Helper.stringToSlug(slug)]);
            if (blog[0]?.slug)
                return { statusCode: HttpStatus.CONFLICT, message: 'Slug already exists' };

            await this.webDatabase.execute('INSERT INTO `blog` (`account`, `title`, `meta_title`, `slug`, `thumbnail`, `summary`, `content`, `published`, `published_at`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
                [accountID, title, metaTitle, Helper.stringToSlug(slug), filename, summary, content, published, published === PublishedStatus.CONFIRMED ? new Date(Date.now()) : null]);

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
            const { title, metaTitle, slug, summary, content, published } = updateBlogDto;

            const [blog] = await this.webDatabase.query('SELECT `title`, `meta_title`, `slug`, `thumbnail`, `summary`, `content`, `published`, `published_at` FROM `blog` WHERE `id` = ?', [id]);
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

            await this.webDatabase.execute('UPDATE `blog` SET `title` = ?, `meta_title` = ?, `slug` = ?, `thumbnail` = ?, `summary` = ?, `content` = ?, `published` = ?, `published_at` = ? WHERE `id` = ?',
                [title || blog[0].title, metaTitle || blog[0].meta_title, Helper.stringToSlug(slug) || blog[0].slug, filename || blog[0].thumbnail, summary || blog[0].summary, content || blog[0].content, published || blog[0].published, published === PublishedStatus.CONFIRMED ? new Date(Date.now()) : blog[0].published_at, id]);

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
}

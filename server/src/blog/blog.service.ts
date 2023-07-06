import * as path from 'path';

import { BadRequestException, HttpStatus, Inject, Injectable, Logger } from '@nestjs/common';
import { Pool } from 'mysql2/promise';

import * as sharp from 'sharp';

import { Helper } from '@/utils/helper.util';

import { CreateBlogDto } from './dto/create-blog.dto';

@Injectable()
export class BlogService
{
    private logger: Logger = new Logger(BlogService.name);

    constructor(
        @Inject('AUTH_DATABASE') private authDatabase: Pool,
        @Inject('WEB_DATABASE') private webDatabase: Pool
    )
    { }

    public async create(accountID: number, createBlogDto: CreateBlogDto, thumbnail: Express.Multer.File)
    {
        try
        {
            const { title, meta_title, slug, summary, content, published } = createBlogDto;
            const sql = 'INSERT INTO `blog` (`account`, `title`, `meta_title`, `slug`, `thumbnail`, `summary`, `content`, `published`, `published_at`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';

            const originalName = path.parse(thumbnail.originalname).name;
            const filename = accountID + '-' + 'thumbnail' + '-' + Date.now() + '-' + originalName + '.jpg';

            await sharp(thumbnail.buffer).toFile(path.join('uploads/thumbnail', filename));

            const [blog] = await this.webDatabase.query('SELECT `slug` FROM `blog` WHERE `slug` = ?', [Helper.stringToSlug(slug)]);
            if (blog[0]?.slug)
                return { statusCode: HttpStatus.CONFLICT, message: 'Slug already exists' };

            await this.webDatabase.execute(sql, [accountID, title, meta_title, Helper.stringToSlug(slug), filename, summary, content, published, published ? new Date(Date.now()) : null]);

            return { statusCode: HttpStatus.OK, message: 'The blog was created successfully' };
        }
        catch (exception)
        {
            this.logger.error(exception);

            if (exception)
                throw new BadRequestException('You are only allowed to upload images.');
        }
    }
}

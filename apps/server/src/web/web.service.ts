import * as path from 'path';

import { BadRequestException, HttpStatus, Inject, Injectable, Logger } from '@nestjs/common';
import { Pool } from 'mysql2/promise';

import * as sharp from 'sharp';

import { Locale } from '@/shared/enums';
import { Helper } from '@/utils/helper.util';

import { CreateFaqDto } from './dto/create-faq.dto';
import { UpdateFaqDto } from './dto/update-faq.dto';
import { CreateFeatureDto } from '@/web/dto/create-feature.dto';
import { CreateCategoryDto } from '@/web/dto/create-category.dto';
import { UpdateCategoryDto } from '@/web/dto/update-category.dto';
import { CreateTagDto } from '@/web/dto/create-tag.dto';
import { UpdateTagDto } from '@/web/dto/update-tag.dto';

@Injectable()
export class WebService
{
    private logger: Logger = new Logger(WebService.name);

    constructor(@Inject('WEB_DATABASE') private webDatabase: Pool)
    {

    }

    /**
     *
     * @param createFaqDto
     *
     * @return { statusCode, message }
     *
     * @description
     *      code:
     *          1003 - Must be longer than or equal to 2 and shorter than or equal to 30 characters
     *          1004 - Must be longer than or equal to 1 and shorter than or equal to 255 characters
     */
    public async createFAQ(createFaqDto: CreateFaqDto)
    {
        const { titleEN, titleDE, titleFA, descriptionEN, descriptionDE, descriptionFA } = createFaqDto;

        await this.webDatabase.execute('INSERT INTO `faq` (`title_en`, `title_de`, `title_fa`, `description_en`, `description_de`, `description_fa`) VALUES (?, ?, ?, ?, ?, ?)',
            [titleEN, titleDE, titleFA, descriptionEN, descriptionDE, descriptionFA]);

        return { statusCode: HttpStatus.OK, message: [{ field: 'successfully', code: '2031' }] };
    }

    public async findAllFAQ(locale: Locale)
    {
        if (!Object.values(Locale)?.includes(locale))
            throw new BadRequestException({ statusCode: HttpStatus.BAD_REQUEST, message: 'Invalid Locale' });

        const sql =
        `
            SELECT
                id, title_${ locale }, description_${ locale }
            FROM
                faq
        `;

        const [faq] = await this.webDatabase.query(sql);
        return { statusCode: HttpStatus.OK, data: { faq } };
    }

    /**
     *
     * @param id
     * @param updateFaqDto
     *
     * @return { statusCode, message }
     *
     * @description
     *      code:
     *          1003 - Must be longer than or equal to 2 and shorter than or equal to 30 characters
     *          1004 - Must be longer than or equal to 1 and shorter than or equal to 255 characters
     *          2004 - FAQ with this id not found
     */
    public async updateFAQ(id: number, updateFaqDto: UpdateFaqDto)
    {
        try
        {
            const { titleEN, titleDE, titleFA, descriptionEN, descriptionDE, descriptionFA } = updateFaqDto;

            const [faq] = await this.webDatabase.query('SELECT * FROM `faq` WHERE `id` = ?', [id]);
            if (!faq[0])
                return { statusCode: HttpStatus.NOT_FOUND, message: [{ field: 'all', code: '2004' }] };

            await this.webDatabase.execute('UPDATE `faq` SET `title_en` = ?, `title_de` = ?, `title_fa` = ?, `description_en` = ?, `description_de` = ?, `description_fa` = ? WHERE `id` = ?',
                [titleEN || faq[0].title_en, titleDE || faq[0].title_de, titleFA || faq[0].title_fa, descriptionEN || faq[0].description_en, descriptionDE || faq[0].description_de, descriptionFA || faq[0].description_fa, id]);

            return { statusCode: HttpStatus.OK, message: [{ field: 'successfully', code: '2032' }] };
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
     * @return { statusCode, message }
     *
     * @description
     *      code:
     *          2004 - FAQ with this id not found
     */
    public async removeFAQ(id: number)
    {
        try
        {
            const [faq] = await this.webDatabase.query('SELECT `id` FROM `faq` WHERE `id` = ?', [id]);
            if (!faq[0])
                return { statusCode: HttpStatus.NOT_FOUND, message: [{ field: 'all', code: '2004' }] };

            await this.webDatabase.execute('DELETE FROM `faq` WHERE `id` = ?', [id]);

            return { statusCode: HttpStatus.OK, message: [{ field: 'successfully', code: '2033' }] };
        }
        catch (exception)
        {
            this.logger.error(exception);
        }
    }

    /**
     *
     * @param createFeatureDto
     * @param image
     *
     * @return { statusCode, message }
     *
     * @description
     *      code:
     *          1003 - Must be longer than or equal to 2 and shorter than or equal to 30 characters
     *          1004 - Must be longer than or equal to 1 and shorter than or equal to 255 characters
     */
    public async createFeature(createFeatureDto: CreateFeatureDto, image: Express.Multer.File)
    {
        const { titleEN, titleDE, titleFA, descriptionEN, descriptionDE, descriptionFA } = createFeatureDto;

        const originalName = path.parse(image.originalname).name;
        const filename = 'feature' + '-' + Date.now() + '-' + originalName + '.jpg';

        await sharp(image.buffer).toFile(path.join('uploads/feature', filename));

        await this.webDatabase.execute('INSERT INTO `feature` (`title_en`, `title_de`, `title_fa`, `image`, `description_en`, `description_de`, `description_fa`) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [titleEN, titleDE, titleFA, filename, descriptionEN, descriptionDE, descriptionFA]);

        return { statusCode: HttpStatus.OK, message: [{ field: 'successfully', code: '2034' }] };
    }

    public async findAllFeatures(locale: Locale)
    {
        if (!Object.values(Locale)?.includes(locale))
            throw new BadRequestException({ statusCode: HttpStatus.BAD_REQUEST, message: 'Invalid Locale' });

        const sql =
            `
            SELECT
                id, title_${ locale }, image, description_${ locale }
            FROM
                feature
        `;

        const [features] = await this.webDatabase.query(sql);
        return { statusCode: HttpStatus.OK, data: { features } };
    }

    /**
     *
     * @param id
     * @param createFeatureDto
     * @param image
     *
     * @return { statusCode, message }
     *
     * @description
     *      code:
     *          1003 - Must be longer than or equal to 2 and shorter than or equal to 30 characters
     *          1004 - Must be longer than or equal to 1 and shorter than or equal to 255 characters
     */
    public async updateFeature(id: number, createFeatureDto: CreateFeatureDto, image: Express.Multer.File)
    {
        const { titleEN, titleDE, titleFA, descriptionEN, descriptionDE, descriptionFA } = createFeatureDto;

        const [feature] = await this.webDatabase.query('SELECT * FROM `feature` WHERE `id` = ?', [id]);
        if (!feature[0])
            return { statusCode: HttpStatus.NOT_FOUND, message: [{ field: 'all', code: '2034' }] };

        let filename = '';
        if (image)
        {
            const originalName = path.parse(image.originalname).name;
            filename = 'feature' + '-' + Date.now() + '-' + originalName + '.jpg';

            await sharp(image.buffer).toFile(path.join('uploads/feature', filename));
        }

        await this.webDatabase.execute('UPDATE `feature` SET `title_en` = ?, `title_de` = ?, `title_fa` = ?, `image` = ?, `description_en` = ?, `description_de` = ?, `description_fa` = ? WHERE `id` = ?',
            [titleEN || feature[0].title_en, titleDE || feature[0].title_de, titleFA || feature[0].title_fa, filename || feature[0].image, descriptionEN || feature[0].description_en, descriptionDE || feature[0].description_de, descriptionFA || feature[0].description_fa]);

        return { statusCode: HttpStatus.OK, message: [{ field: 'successfully', code: '2036' }] };
    }

    /**
     *
     * @param id
     *
     * @return { statusCode, message }
     *
     * @description
     *      code:
     *          2005 - Feature with this id not found
     */
    public async removeFeature(id: number)
    {
        try
        {
            const [feature] = await this.webDatabase.query('SELECT `id` FROM `feature` WHERE `id` = ?', [id]);
            if (!feature[0])
                return { statusCode: HttpStatus.NOT_FOUND, message: [{ field: 'all', code: '2005' }] };

            await this.webDatabase.execute('DELETE FROM `faq` WHERE `id` = ?', [id]);

            return { statusCode: HttpStatus.OK, message: [{ field: 'successfully', code: '2037' }] };
        }
        catch (exception)
        {
            this.logger.error(exception);
        }
    }

    /**
     *
     * @param createCategoryDto
     *
     * @return { statusCode, message }
     *
     * @description
     *      code:
     *          1003 - Must be longer than or equal to 1 and shorter than or equal to 50 characters
     *          1004 - Must be longer than or equal to 1 and shorter than or equal to 255 characters
     *          1007 - Must be longer than or equal to 1 and shorter than or equal to 100 characters
     *          2006 - Slug already exists
     *          2038 - The Category was created successfully
     */
    public async createCategory(createCategoryDto: CreateCategoryDto)
    {
        const { titleEN, titleDE, titleFA, metaTitleEN, metaTitleDE, metaTitleFA, slugEN, slugDE, slugFA, contentEN, contentDE, contentFA } = createCategoryDto;

        const sql =
        `
            INSERT INTO
                category
                (
                    title_en, title_de, title_fa,
                    meta_title_en, meta_title_de, meta_title_fa,
                    slug_en, slug_de, slug_fa,
                    content_en, content_de, content_fa
                )
            VALUES
                (? ,? ,? ,? ,? ,? ,? ,? ,? ,? ,? ,?);
        `;

        const [category] = await this.webDatabase.query('SELECT `slug_en`, `slug_de`, `slug_fa` FROM `category` WHERE `slug_en` = ? OR `slug_de` = ? OR `slug_fa` = ?', [Helper.stringToSlug(slugEN), Helper.stringToSlug(slugDE), Helper.stringToSlug(slugFA)]);
        if (category[0]?.slug_en || category[0]?.slug_de || category[0]?.slug_fa)
            return { statusCode: HttpStatus.CONFLICT, message: [{ field: 'all', code: '2006' }] };

        await this.webDatabase.execute
        (
            sql,
            [
                titleEN, titleDE, titleFA,
                metaTitleEN, metaTitleDE, metaTitleFA,
                Helper.stringToSlug(slugEN), Helper.stringToSlug(slugDE), Helper.stringToSlug(slugFA),
                contentEN, contentDE, contentFA
            ]
        );

        return { statusCode: HttpStatus.OK, message: [{ field: 'successfully', code: '2038' }] };
    }

    public async findAllCategories(locale: Locale)
    {
        if (!Object.values(Locale)?.includes(locale))
            throw new BadRequestException({ statusCode: HttpStatus.BAD_REQUEST, message: 'Invalid Locale' });

        const sql =
        `
            SELECT
                id, title_${ locale }, meta_title_${ locale }, slug_${ locale }, content_${ locale }
            FROM
                category
        `;

        const [categories] = await this.webDatabase.query(sql);
        return { statusCode: HttpStatus.OK, data: { categories } };
    }

    /**
     *
     * @param id
     * @param updateCategoryDto
     *
     * @return { statusCode, message }
     *
     * @description
     *      code:
     *          1003 - Must be longer than or equal to 1 and shorter than or equal to 50 characters
     *          1004 - Must be longer than or equal to 1 and shorter than or equal to 255 characters
     *          1007 - Must be longer than or equal to 1 and shorter than or equal to 100 characters
     *          2039 - Category updated successfully
     *          2040 - Category with this id not found
     */
    public async updateCategory(id: number, updateCategoryDto: UpdateCategoryDto)
    {
        try
        {
            const { titleEN, titleDE, titleFA, metaTitleEN, metaTitleDE, metaTitleFA, slugEN, slugDE, slugFA, contentEN, contentDE, contentFA } = updateCategoryDto;

            const [category] = await this.webDatabase.query('SELECT * FROM `category` WHERE `id` = ?', [id]);
            if (!category[0])
                return { statusCode: HttpStatus.NOT_FOUND, message: [{ field: 'all', code: '2040' }] };

            const sql =
            `
                UPDATE
                    category
                SET
                    title_en = ?, title_de = ?, title_fa = ?,
                    meta_title_en = ?, meta_title_de = ?, meta_title_fa = ?,
                    slug_en = ?, slug_de = ?, slug_fa = ?,
                    content_en = ?, content_de = ?, content_fa = ?
                WHERE
                    id = ?;
            `;

            await this.webDatabase.execute
            (
                sql,
                [
                    titleEN || category[0].title_en, titleDE || category[0].title_de, titleFA || category[0].title_fa,
                    metaTitleEN || category[0].meta_title_en, metaTitleDE || category[0].meta_title_de, metaTitleFA || category[0].meta_title_fa,
                    slugEN || category[0].slug_en, slugDE || category[0].slug_de, slugFA || category[0].slug_fa,
                    contentEN || category[0].content_en, contentDE || category[0].content_de, contentFA || category[0].content_fa,
                    id
                ]
            );

            return { statusCode: HttpStatus.OK, message: [{ field: 'successfully', code: '2039' }] };
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
     * @return { statusCode, message }
     *
     * @description
     *      code:
     *          2040 - Category with this id not found
     *          2041 - The Category has been successfully deleted
     */
    public async removeCategory(id: number)
    {
        try
        {
            const [category] = await this.webDatabase.query('SELECT `id` FROM `category` WHERE `id` = ?', [id]);
            if (!category[0])
                return { statusCode: HttpStatus.NOT_FOUND, message: [{ field: 'all', code: '2040' }] };

            await this.webDatabase.execute('DELETE FROM `category` WHERE `id` = ?', [id]);

            return { statusCode: HttpStatus.OK, message: [{ field: 'successfully', code: '2042' }] };
        }
        catch (exception)
        {
            this.logger.error(exception);
        }
    }

    /**
     *
     * @param createTagDto
     *
     * @return { statusCode, message }
     *
     * @description
     *      code:
     *          1003 - Must be longer than or equal to 1 and shorter than or equal to 50 characters
     *          1004 - Must be longer than or equal to 1 and shorter than or equal to 255 characters
     *          1007 - Must be longer than or equal to 1 and shorter than or equal to 100 characters
     *          2006 - Slug already exists
     *          2042 - The Tag was created successfully
     */
    public async createTag(createTagDto: CreateTagDto)
    {
        const { titleEN, titleDE, titleFA, metaTitleEN, metaTitleDE, metaTitleFA, slugEN, slugDE, slugFA, contentEN, contentDE, contentFA } = createTagDto;

        const sql =
        `
            INSERT INTO
                tag
                (
                    title_en, title_de, title_fa,
                    meta_title_en, meta_title_de, meta_title_fa,
                    slug_en, slug_de, slug_fa,
                    content_en, content_de, content_fa
                )
            VALUES
                (? ,? ,? ,? ,? ,? ,? ,? ,? ,? ,? ,?);
        `;

        const [tag] = await this.webDatabase.query('SELECT `slug_en`, `slug_de`, `slug_fa` FROM `tag` WHERE `slug_en` = ? OR `slug_de` = ? OR `slug_fa` = ?', [Helper.stringToSlug(slugEN), Helper.stringToSlug(slugDE), Helper.stringToSlug(slugFA)]);
        if (tag[0]?.slug_en || tag[0]?.slug_de || tag[0]?.slug_fa)
            return { statusCode: HttpStatus.CONFLICT, message: [{ field: 'all', code: '2006' }] };

        await this.webDatabase.execute
        (
            sql,
            [
                titleEN, titleDE, titleFA,
                metaTitleEN, metaTitleDE, metaTitleFA,
                Helper.stringToSlug(slugEN), Helper.stringToSlug(slugDE), Helper.stringToSlug(slugFA),
                contentEN, contentDE, contentFA
            ]
        );

        return { statusCode: HttpStatus.OK, message: [{ field: 'successfully', code: '2042' }] };
    }

    public async findAllTags(locale: Locale)
    {
        if (!Object.values(Locale)?.includes(locale))
            throw new BadRequestException({ statusCode: HttpStatus.BAD_REQUEST, message: 'Invalid Locale' });

        const sql =
        `
            SELECT
                id, title_${ locale }, meta_title_${ locale }, slug_${ locale }, content_${ locale }
            FROM
                tag
        `;

        const [tags] = await this.webDatabase.query(sql);
        return { statusCode: HttpStatus.OK, data: { tags } };
    }

    public async searchInTag(locale: Locale, search: string, page = 1, limit = 20)
    {
        if (!Object.values(Locale)?.includes(locale))
            throw new BadRequestException({ statusCode: HttpStatus.BAD_REQUEST, message: 'Invalid Locale' });

        const sql =
        `
            SELECT
                id, title_${ locale }, meta_title_${ locale }, slug_${ locale }, content_${ locale }
            FROM
                tag
            WHERE
                title_${ locale }
            OR
                content_${ locale }
            LIKE '%${ search }%'
            LIMIT ${ page - 1 }, ${ limit }
        `;
        const [tags] = await this.webDatabase.query(sql);
        const [tagsCount] = await this.webDatabase.query('SELECT COUNT(id) AS totals FROM `tag`');

        return { statusCode: HttpStatus.OK, data: { tagsCount, hasMore: Number(page) < Math.ceil(tagsCount[0].totals / Number(limit)), tags } };
    }

    /**
     *
     * @param id
     * @param updateTagDto
     *
     * @return { statusCode, message }
     *
     * @description
     *      code:
     *          1003 - Must be longer than or equal to 1 and shorter than or equal to 50 characters
     *          1004 - Must be longer than or equal to 1 and shorter than or equal to 255 characters
     *          1007 - Must be longer than or equal to 1 and shorter than or equal to 100 characters
     *          2044 - Tag updated successfully
     *          2043 - Tag with this id not found
     */
    public async updateTag(id: number, updateTagDto: UpdateTagDto)
    {
        try
        {
            const { titleEN, titleDE, titleFA, metaTitleEN, metaTitleDE, metaTitleFA, slugEN, slugDE, slugFA, contentEN, contentDE, contentFA } = updateTagDto;

            const [tag] = await this.webDatabase.query('SELECT * FROM `tag` WHERE `id` = ?', [id]);
            if (!tag[0])
                return { statusCode: HttpStatus.NOT_FOUND, message: [{ field: 'all', code: '2043' }] };

            const sql =
            `
                UPDATE
                    tag
                SET
                    title_en = ?, title_de = ?, title_fa = ?,
                    meta_title_en = ?, meta_title_de = ?, meta_title_fa = ?,
                    slug_en = ?, slug_de = ?, slug_fa = ?,
                    content_en = ?, content_de = ?, content_fa = ?
                WHERE
                    id = ?;
            `;

            await this.webDatabase.execute
            (
                sql,
                [
                    titleEN || tag[0].title_en, titleDE || tag[0].title_de, titleFA || tag[0].title_fa,
                    metaTitleEN || tag[0].meta_title_en, metaTitleDE || tag[0].meta_title_de, metaTitleFA || tag[0].meta_title_fa,
                    slugEN || tag[0].slug_en, slugDE || tag[0].slug_de, slugFA || tag[0].slug_fa,
                    contentEN || tag[0].content_en, contentDE || tag[0].content_de, contentFA || tag[0].content_fa,
                    id
                ]
            );

            return { statusCode: HttpStatus.OK, message: [{ field: 'successfully', code: '2044' }] };
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
     * @return { statusCode, message }
     *
     * @description
     *      code:
     *          2045 - Tag with this id not found
     *          2046 - The Tag has been successfully deleted
     */
    public async removeTag(id: number)
    {
        try
        {
            const [tag] = await this.webDatabase.query('SELECT `id` FROM `tag` WHERE `id` = ?', [id]);
            if (!tag[0])
                return { statusCode: HttpStatus.NOT_FOUND, message: [{ field: 'all', code: '2045' }] };

            await this.webDatabase.execute('DELETE FROM `tag` WHERE `id` = ?', [id]);

            return { statusCode: HttpStatus.OK, message: [{ field: 'successfully', code: '2046' }] };
        }
        catch (exception)
        {
            this.logger.error(exception);
        }
    }
}

import * as path from 'path';

import { BadRequestException, HttpStatus, Inject, Injectable, Logger } from '@nestjs/common';
import { Pool } from 'mysql2/promise';

import * as sharp from 'sharp';

import { Locale } from '@/shared/enums';

import { CreateFaqDto } from './dto/create-faq.dto';
import { UpdateFaqDto } from './dto/update-faq.dto';
import { CreateFeatureDto } from '@/web/dto/create-feature.dto';

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

        return { statusCode: HttpStatus.OK, message: 'The FAQ was created successfully' };
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
                FAQ
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

            return { statusCode: HttpStatus.OK, message: 'FAQ updated successfully' };
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

            return { statusCode: HttpStatus.OK, message: 'The FAQ has been successfully deleted' };
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

        return { statusCode: HttpStatus.OK, message: 'The Feature was created successfully' };
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
            return { statusCode: HttpStatus.NOT_FOUND, message: 'Feature with this id not found' };

        let filename = '';
        if (image)
        {
            const originalName = path.parse(image.originalname).name;
            filename = 'feature' + '-' + Date.now() + '-' + originalName + '.jpg';

            await sharp(image.buffer).toFile(path.join('uploads/feature', filename));
        }

        await this.webDatabase.execute('UPDATE `feature` SET `title_en` = ?, `title_de` = ?, `title_fa` = ?, `image` = ?, `description_en` = ?, `description_de` = ?, `description_fa` = ? WHERE `id` = ?',
            [titleEN || feature[0].title_en, titleDE || feature[0].title_de, titleFA || feature[0].title_fa, filename || feature[0].image, descriptionEN || feature[0].description_en, descriptionDE || feature[0].description_de, descriptionFA || feature[0].description_fa]);

        return { statusCode: HttpStatus.OK, message: 'Feature updated successfully' };
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

            return { statusCode: HttpStatus.OK, message: 'The FAQ has been successfully deleted' };
        }
        catch (exception)
        {
            this.logger.error(exception);
        }
    }
}

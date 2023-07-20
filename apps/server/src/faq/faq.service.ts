import { HttpStatus, Inject, Injectable, Logger } from '@nestjs/common';
import { Pool } from 'mysql2/promise';

import { CreateFaqDto } from './dto/create-faq.dto';
import { UpdateFaqDto } from './dto/update-faq.dto';

@Injectable()
export class FaqService
{
    private logger: Logger = new Logger(FaqService.name);

    constructor(@Inject('WEB_DATABASE') private webDatabase: Pool)
    {

    }

    public async create(createFaqDto: CreateFaqDto)
    {
        const { title, descriptionEN, descriptionDE, descriptionFA } = createFaqDto;

        await this.webDatabase.execute('INSERT INTO `faq` (`title`, `description_en`, `description_de`, `description_fa`) VALUES (?, ?, ?, ?)', [title, descriptionEN, descriptionDE || null, descriptionFA || null]);

        return { statusCode: HttpStatus.OK, message: 'The FAQ was created successfully' };
    }

    public async findAll()
    {
        const [faq] = await this.webDatabase.query('SELECT * FROM `FAQ`');

        return { statusCode: HttpStatus.OK, data: { faq } };
    }

    public async update(id: number, updateFaqDto: UpdateFaqDto)
    {
        try
        {
            const { title, descriptionEN, descriptionDE, descriptionFA } = updateFaqDto;

            const [faq] = await this.webDatabase.query('SELECT * FROM `faq` WHERE `id` = ?', [id]);
            if (!faq[0])
                return { statusCode: HttpStatus.NOT_FOUND, message: 'FAQ with this id not found' };

            await this.webDatabase.execute('UPDATE `faq` SET `title` = ?, `description_en` = ?, `description_de` = ?, `description_fa` = ? WHERE `id` = ?',
                [title || faq[0].title, descriptionEN || faq[0].description_en, descriptionDE || faq[0].description_de, descriptionFA || faq[0].description_fa, id]);

            return { statusCode: HttpStatus.OK, message: 'FAQ updated successfully' };
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
            const [faq] = await this.webDatabase.query('SELECT `id` FROM `faq` WHERE `id` = ?', [id]);
            if (!faq[0])
                return { statusCode: HttpStatus.NOT_FOUND, message: 'FAQ with this id not found' };

            await this.webDatabase.execute('DELETE FROM `faq` WHERE `id` = ?', [id]);

            return { statusCode: HttpStatus.OK, message: 'The FAQ has been successfully deleted' };
        }
        catch (exception)
        {
            this.logger.error(exception);
        }
    }
}

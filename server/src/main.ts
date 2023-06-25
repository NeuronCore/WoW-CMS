import { NestFactory } from '@nestjs/core';
import { INestApplication, Logger, ValidationPipe } from '@nestjs/common';

import * as cookieParser from 'cookie-parser';

import { AppModule } from './app.module';

async function bootstrap()
{
    const logger: Logger = new Logger('Bootstrap');
    const app: INestApplication = await NestFactory.create(AppModule);
    const port: number = +process.env.PORT || 4001;

    app.enableCors({ origin: process.env.CORS, credentials: true });
    app.useGlobalPipes(new ValidationPipe());
    app.use(cookieParser());

    await app.listen(port);
    logger.log(`Application listening on port ${ port }`);
}

bootstrap();

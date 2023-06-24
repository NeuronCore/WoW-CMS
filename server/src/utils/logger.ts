import * as winston from 'winston';

export const logger: winston.Logger = winston.createLogger
({
    level: 'info',
    format: winston.format.combine(winston.format.timestamp(), winston.format.json(), winston.format.colorize()),
    transports:
    [
        new winston.transports.File({ filename: 'logs/error.log' }),
        new winston.transports.Console()
    ]
});

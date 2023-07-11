import { Module } from '@nestjs/common';

import { CharactersService } from './characters.service';
import { CharactersController } from './characters.controller';
import { CharactersResolver } from '@/characters/characters.resolver';
import { DatabaseModule } from '@/database/database.module';

@Module
({
    imports: [DatabaseModule],
    controllers: [CharactersController],
    providers: [CharactersService, CharactersResolver]
})
export class CharactersModule
{}

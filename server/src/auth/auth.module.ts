import { Module } from '@nestjs/common';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

import { DatabaseModule } from '@/database.module';

@Module({
    imports: [DatabaseModule],
    controllers: [AuthController],
    providers: [AuthService]
})
export class AuthModule
{

}

import { Module } from '@nestjs/common';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { AuthResolver } from '@/auth/auth.resolver';

import { DatabaseModule } from '@/database/database.module';

@Module({
    imports: [DatabaseModule],
    controllers: [AuthController],
    providers: [AuthService, AuthResolver]
})
export class AuthModule
{

}

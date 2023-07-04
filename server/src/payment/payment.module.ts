import { Module } from '@nestjs/common';

import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';

import { DatabaseModule } from '@/database.module';

@Module
({
    imports: [DatabaseModule],
    controllers: [PaymentController],
    providers: [PaymentService]
})
export class PaymentModule
{

}

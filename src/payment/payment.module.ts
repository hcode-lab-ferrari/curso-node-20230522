import { Module } from '@nestjs/common';
import { PaymentController } from './payment.controller';
import { PaymentService } from './payment.service';
import { HttpModule } from '@nestjs/axios';
import { SchedulesModule } from '../schedules/schedules.module';
import { ServicesModule } from '../services/services.module';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [HttpModule, ServicesModule, SchedulesModule, PrismaModule],

  controllers: [PaymentController],
  providers: [PaymentService],
})
export class PaymentModule {}

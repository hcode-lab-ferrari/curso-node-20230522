import { Module } from '@nestjs/common';
import { TimeOptionsService } from './time-options.service';
import { TimeOptionsController } from './time-options.controller';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [TimeOptionsController],
  providers: [TimeOptionsService, PrismaService],
})
export class TimeOptionsModule {}

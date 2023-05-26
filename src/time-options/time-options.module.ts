import { Module } from '@nestjs/common';
import { TimeOptionsService } from './time-options.service';
import { TimeOptionsController } from './time-options.controller';

@Module({
  controllers: [TimeOptionsController],
  providers: [TimeOptionsService]
})
export class TimeOptionsModule {}

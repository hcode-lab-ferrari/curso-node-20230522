import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class TimeOptionsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(day?: number) {
    return this.prisma.timeOption.findMany(
      !isNaN(day)
        ? {
            where: {
              day: Number(day),
            },
          }
        : undefined,
    );
  }

  async findOne(id: number) {
    id = Number(id);

    if (isNaN(id)) {
      throw new BadRequestException('id must be a number');
    }

    return this.prisma.timeOption.findUnique({
      where: {
        id,
      },
    });
  }
  /********************************** */
  getDateFromTimeString(time: string) {
    const splittedTime = time.split(':');

    if (splittedTime.length !== 2) {
      throw new BadRequestException('Time format is invalid');
    }

    const hour = Number(splittedTime[0]);
    const minute = Number(splittedTime[1]);

    if (isNaN(hour) || isNaN(minute)) {
      throw new BadRequestException('Time format is invalid');
    }

    if (hour < 0 || hour > 23) {
      throw new BadRequestException('Hour is invalid');
    }
    if (minute < 0 || minute > 59) {
      throw new BadRequestException('Minute is invalid');
    }
    const timeDate = new Date();
    timeDate.setHours(hour, minute, 0);

    return timeDate;
  }
  /********************************** */
  create({ day, time }: { day: number; time: string }) {
    if (isNaN(day) || day < 0 || day > 6) {
      throw new BadRequestException('Day is required');
    }

    if (!time) {
      throw new BadRequestException('Time is required');
    }

    day = Number(day);

    return this.prisma.timeOption.create({
      data: {
        day,
        time: this.getDateFromTimeString(time),
      },
    });
  }

  /********************************** */
  async update(id: number, { day, time }: { day?: number; time?: string }) {
    id = Number(id);

    if (isNaN(id)) {
      throw new BadRequestException('id must be a numberID is required');
    }

    await this.findOne(id);

    const dateTimeOption = {} as Prisma.TimeOptionUpdateInput;

    if (day) {
      if (isNaN(day) || day < 0 || day > 6) {
        throw new BadRequestException('Day is required');
      }
      dateTimeOption.day = Number(day);
    }

    if (time) {
      dateTimeOption.time = this.getDateFromTimeString(time);
    }

    return this.prisma.timeOption.update({
      where: {
        id,
      },
      data: dateTimeOption,
    });
  }
  /********************************** */
  async remove(id: number) {
    id = Number(id);

    if (isNaN(id)) {
      throw new BadRequestException('id must be a number');
    }

    const timeOption = await this.findOne(id);
    if (!timeOption) {
      throw new NotFoundException('Time Option not found');
    }
    await this.prisma.timeOption.delete({
      where: {
        id,
      },
    });

    return { success: true, message: 'Time Option deleted successfully' };
  }
}

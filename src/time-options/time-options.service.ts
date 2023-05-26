import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateTimeOptionDto } from './dto/create-time-option.dto';
import { UpdateTimeOptionDto } from './dto/update-time-option.dto';
import { PrismaService } from '../prisma/prisma.service';

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
  create(createTimeOptionDto: CreateTimeOptionDto) {
    return 'This action adds a new timeOption';
  }
  update(id: number, updateTimeOptionDto: UpdateTimeOptionDto) {
    return `This action updates a #${id} timeOption`;
  }

  remove(id: number) {
    return `This action removes a #${id} timeOption`;
  }
}

import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ServicesService {
  constructor(private prisma: PrismaService) {}

  async getAll() {
    return {};
  }
  async get(id: number) {
    return {};
  }

  async create({
    name,
    description,
    price,
  }: {
    name: string;
    description: string;
    price: number;
  }) {
    return {};
  }
}

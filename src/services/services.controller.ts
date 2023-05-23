import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ServicesService } from './services.service';
import { AuthGuard } from '../auth/auth.guard';
import { CreateServicesDto } from './dto/create-services.dto';

@Controller('services')
export class ServicesController {
  constructor(private servicesService: ServicesService) {}

  @Get()
  async getAll() {
    return await this.servicesService.getAll();
  }

  @Get(':id')
  async getById(@Param('id') id: number) {
    return await this.servicesService.get(id);
  }

  //@UseGuards(AuthGuard)
  @Post()
  async create(@Body() data: CreateServicesDto) {
    return await this.servicesService.create(data);
  }
}

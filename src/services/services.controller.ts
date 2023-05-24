import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ServicesService } from './services.service';
import { AuthGuard } from '../auth/auth.guard';
import { CreateServicesDto } from './dto/create-services.dto';
import { UpdateServicesDto } from './dto/update-services.dto';

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

  //@UseGuards(AuthGuard)
  @Put(':id')
  async update(@Param('id') id: number, @Body() data: UpdateServicesDto) {
    return await this.servicesService.update(id, data);
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    return await this.servicesService.delete(id);
  }
}

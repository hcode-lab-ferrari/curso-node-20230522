import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Put,
} from '@nestjs/common';
import { TimeOptionsService } from './time-options.service';
import { CreateTimeOptionDto } from './dto/create-time-option.dto';
import { UpdateTimeOptionDto } from './dto/update-time-option.dto';

@Controller('time-options')
export class TimeOptionsController {
  constructor(private readonly timeOptionsService: TimeOptionsService) {}

  @Post()
  create(@Body() createTimeOptionDto: CreateTimeOptionDto) {
    return this.timeOptionsService.create(createTimeOptionDto);
  }

  @Get()
  async findAll(@Query('day') day) {
    return this.timeOptionsService.findAll(Number(day));
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.timeOptionsService.findOne(+id);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateTimeOptionDto: UpdateTimeOptionDto,
  ) {
    return this.timeOptionsService.update(+id, updateTimeOptionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.timeOptionsService.remove(+id);
  }
}

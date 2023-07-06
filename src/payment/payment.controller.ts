import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { ServicesService } from '../services/services.service';
import { PaymentService } from './payment.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { User } from '../user/user.decorator';
import { CreatePreferenceDto } from './dto/create-preference.dto';

@Controller('payment')
export class PaymentController {
  constructor(
    private servicesService: ServicesService,
    private paymentService: PaymentService,
  ) {}

  @Get()
  async paymentBefore(@Query('services') services) {
    console.log('CONTROLLER: Caiu payment before');
    return {
      amount: await this.servicesService.getAmount(services),
    };
  }

  @Post()
  async paymentCreate(@Body() data: CreatePaymentDto, @User() user) {
    return this.paymentService.create(data, user.personId);
  }

  @Post('preferences')
  async preferences(@Body() data: CreatePreferenceDto) {
    console.log('CONTROLLER: Caiu /Payment/Preferences');
    return this.paymentService.preferences(data);
  }

  @Post(':id')
  async paymentConfirm(@Param('id') id) {
    return this.paymentService.payment(Number(id));
  }
}

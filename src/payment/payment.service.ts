import { Injectable } from '@nestjs/common';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { CreatePreferenceDto } from './dto/create-preference.dto';
import { HttpService } from '@nestjs/axios';
import { PrismaService } from '../prisma/prisma.service';
import { ServicesService } from '../services/services.service';

import { lastValueFrom } from 'rxjs';
import { SchedulesService } from '../schedules/schedules.service';

@Injectable()
export class PaymentService {
  constructor(
    private httpService: HttpService,
    private prisma: PrismaService,
    private service: ServicesService,
    private schedule: SchedulesService,
  ) {}

  async create(
    {
      billingAddressId,
      cardToken,
      installments,
      scheduleAt,
      services,
      timeOptionId,
      paymentMethod,
      document,
    }: CreatePaymentDto,
    personId: number,
  ) {}

  async payment(id: number) {}

  async preferences({ email, items }: CreatePreferenceDto) {
    try {
      const { data } = await lastValueFrom(
        this.httpService.request({
          url:
            'https://api.mercadopago.com/checkout/preferences?access_token=' +
            process.env.MERCADOPAGO_TOKEN,
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          data: {
            payer: { email },
            items: items.map(({ title, description, quantity, unitPrice }) => ({
              title,
              description,
              quantity,
              unit_price: unitPrice,
              currency_id: 'BRL',
            })),
          },
        }),
      );
    } catch (error) {}
  }
}

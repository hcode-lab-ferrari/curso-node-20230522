import { BadRequestException, Injectable } from '@nestjs/common';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { CreatePreferenceDto } from './dto/create-preference.dto';
import { HttpService } from '@nestjs/axios';
import { PrismaService } from '../prisma/prisma.service';
import { ServicesService } from '../services/services.service';

import { lastValueFrom } from 'rxjs';
import { SchedulesService } from '../schedules/schedules.service';
import { getOnlyNumbers } from '../utils/getOnlyNumbers';
import { parse } from 'date-fns';

@Injectable()
export class PaymentService {
  constructor(
    private httpService: HttpService,
    private prisma: PrismaService,
    private service: ServicesService,
    private schedule: SchedulesService,
  ) {}

  async payment(id: number) {
    const schedule = await this.schedule.get(id);

    const data = {
      token: schedule.cardToken,
      description: 'Serviços de manutenção',
      external_reference: String(schedule.id),
      installments: schedule.installments,
      additional_info: {
        items: (schedule.ScheduleService ?? []).map(({ service }) => ({
          id: service.id,
          title: service.name,
          description: service.description,
          quantity: 1,
          unit_price: service.price,
        })),
        payer: {
          first_name: schedule.person.name.split(' ').shift(),
          last_name: schedule.person.name.split(' ').pop(),
        },
      },
      payer: {
        entity_type: 'individual',
        type: 'customer',
        email: schedule.person.User[0].email,
        identification: {
          type: schedule.document.length === 11 ? 'CPF' : 'CNPJ',
          number: schedule.document,
        },
      },
      payment_method_id: schedule.paymentMethod,
      transaction_amount: Number(schedule.total),
    };

    try {
      const { data: responseData } = await lastValueFrom(
        this.httpService.request({
          url: 'https://api.mercadopago.com/v1/payments',
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + process.env.MERCADOPAGO_TOKEN,
          },
          data,
        }),
      );

      let paymentSituationId = 1;

      switch (responseData.status) {
        case 'approved':
          paymentSituationId = 3;
          break;
        case 'pending':
        case 'in_process':
          paymentSituationId = 1;
          break;
        case 'rejected':
          paymentSituationId = 2;
          break;
      }

      return await this.prisma.schedule.update({
        where: {
          id: schedule.id,
        },
        data: {
          paymentSituationId,
        },
        include: {
          ScheduleService: {
            include: {
              service: true,
            },
          },
        },
      });
    } catch (e) {
      throw new BadRequestException(
        e.response ? e.response.data.message : e.message,
      );
    }
  }

  async create(
    {
      billingAddressId,
      cardToken,
      installments,
      scheduleAt: scheduleAtString,
      services,
      timeOptionId,
      paymentMethod,
      document,
    }: CreatePaymentDto,
    personId: number,
  ) {
    if (isNaN(Number(personId))) {
      throw new BadRequestException('Person ID is required.');
    }

    try {
      const scheduleAt = parse(scheduleAtString, 'yyyy-MM-dd', new Date());

      if (scheduleAt.toString() === 'Invalid Date') {
        throw new BadRequestException('Invalid schedule date.');
      }

      document = getOnlyNumbers(document);

      const schedule = await this.prisma.schedule.create({
        data: {
          billingAddressId,
          cardToken,
          installments,
          scheduleAt,
          timeOptionId,
          personId,
          total: await this.service.getAmount(services.toString()),
          paymentSituationId: 1,
          paymentMethod,
          document,
        },
      });
      console.log('Payment.service', services);
      await this.prisma.scheduleService.createMany({
        data: services.map((serviceId) => ({
          scheduleId: schedule.id,
          serviceId,
        })),
      });

      return this.prisma.schedule.findUnique({
        where: {
          id: schedule.id,
        },
        include: {
          ScheduleService: {
            include: {
              service: true,
            },
          },
        },
      });
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

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
      return data;
    } catch (error) {}
  }
}

import { MailModule } from './mail/mail.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { PrismaModule } from './prisma/prisma.module';
import { ServicesModule } from './services/services.module';
import { ContactsModule } from './contacts/contacts.module';
import { TimeOptionsModule } from './time-options/time-options.module';
import { AddressesModule } from './addresses/addresses.module';
import { PaymentModule } from './payment/payment.module';
import { SchedulesModule } from './schedules/schedules.module';
import { PaymentSituationsModule } from './payment-situations/payment-situations.module';

@Module({
  imports: [MailModule, AuthModule, UserModule, PrismaModule, ServicesModule, ContactsModule, TimeOptionsModule, AddressesModule, PaymentModule, SchedulesModule, PaymentSituationsModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}

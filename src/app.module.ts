import { MailModule } from './mail/mail.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { PrismaModule } from './prisma/prisma.module';
import { ServicesModule } from './services/services.module';

@Module({
  imports: [MailModule, AuthModule, UserModule, PrismaModule, ServicesModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}

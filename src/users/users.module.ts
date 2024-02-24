import { Module } from '@nestjs/common';
import { FindUserByEmailService } from './services/find-user-by-email.service';
import { PrismaModule } from 'src/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [FindUserByEmailService],
  exports: [FindUserByEmailService],
})
export class UsersModule {}

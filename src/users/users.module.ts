import { Module } from '@nestjs/common';
import { FindUserByEmailService } from './services/find-user-by-email.service';
import { PrismaModule } from 'src/prisma.module';
import { CreateUserService } from './services/create-user.service';

@Module({
  imports: [PrismaModule],
  providers: [FindUserByEmailService, CreateUserService],
  exports: [FindUserByEmailService, CreateUserService],
})
export class UsersModule {}

import { Module } from '@nestjs/common';
import { FindUserByEmailService } from './services/find-user-by-email.service';
import { PrismaModule } from 'src/prisma.module';
import { CreateUserService } from './services/create-user.service';
import { UsersController } from './users.controller';

@Module({
  imports: [PrismaModule],
  controllers: [UsersController],
  providers: [FindUserByEmailService, CreateUserService],
  exports: [FindUserByEmailService],
})
export class UsersModule {}

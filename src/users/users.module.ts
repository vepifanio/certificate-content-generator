import { Module } from '@nestjs/common';
import { FindUserByEmailService } from './services/find-user-by-email.service';

@Module({
  providers: [FindUserByEmailService],
  exports: [FindUserByEmailService],
})
export class UsersModule {}

import { Module } from '@nestjs/common';
import { CertificatesModule } from './certificates/certificates.module';
import { PrismaModule } from './prisma.module';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { StudentsController } from './students/students.controller';
import { StudentsModule } from './students/students.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    PrismaModule,
    CertificatesModule,
    AuthModule,
    UsersModule,
    StudentsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

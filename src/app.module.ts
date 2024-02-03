import { Module } from '@nestjs/common';
import { CertificatesModule } from './certificates/certificates.module';
import { PrismaModule } from './prisma.module';

@Module({
  imports: [PrismaModule, CertificatesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}

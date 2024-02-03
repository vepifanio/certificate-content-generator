import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { CertificatesRepository } from './certificates/repositories/CertificatesRepository';
import { PrismaCertificatesRepository } from './certificates/repositories/PrismaCertificatesRepository';

@Module({
  providers: [
    PrismaService,
    {
      provide: CertificatesRepository,
      useClass: PrismaCertificatesRepository,
    },
  ],
  exports: [PrismaService, CertificatesRepository],
})
export class PrismaModule {}

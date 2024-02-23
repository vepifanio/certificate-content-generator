import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { CertificatesRepository } from './certificates/repositories/CertificatesRepository';
import { PrismaCertificatesRepository } from './certificates/repositories/PrismaCertificatesRepository';
import { UsersRepository } from './users/repositories/UsersRepository';
import { PrismaUsersRepository } from './users/repositories/PrismaUsersRepository';

@Module({
  providers: [
    PrismaService,
    {
      provide: CertificatesRepository,
      useClass: PrismaCertificatesRepository,
    },
    {
      provide: UsersRepository,
      useClass: PrismaUsersRepository,
    },
  ],
  exports: [PrismaService, CertificatesRepository, UsersRepository],
})
export class PrismaModule {}

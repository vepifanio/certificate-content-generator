import { Injectable } from '@nestjs/common';
import { Certificate } from '../entities/certificate.entity';
import { CertificatesRepository } from './CertificatesRepository';
import { PrismaService } from 'src/prisma.service';
import { CertificateMapper } from '../mappers/CertificateMapper';

@Injectable()
export class PrismaCertificatesRepository implements CertificatesRepository {
  constructor(private prismaService: PrismaService) {}

  async create(certificate: Certificate): Promise<void> {
    const prismaCertificate = CertificateMapper.toPrisma(certificate);
    await this.prismaService.certificate.create({
      data: prismaCertificate,
    });
  }

  async findById(id: string): Promise<Certificate | null> {
    const certificate = await this.prismaService.certificate.findFirst({
      where: {
        id,
      },
    });

    if (!certificate) {
      return null;
    }

    return CertificateMapper.toDomain(certificate);
  }
  fetchAll(): Promise<Certificate[]> {
    throw new Error('Method not implemented.');
  }
}

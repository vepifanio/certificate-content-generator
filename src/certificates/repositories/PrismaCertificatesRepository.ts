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
      data: {
        ...prismaCertificate.certificate,
        documents: {
          createMany: {
            data: prismaCertificate.documents,
            skipDuplicates: true,
          },
        },
      },
    });
  }

  async save(certificate: Certificate): Promise<void> {
    const prismaCertificate = CertificateMapper.toPrisma(certificate);
    // TODO - Fix update documents on prisma repository
    await this.prismaService.certificate.update({
      where: {
        id: prismaCertificate.certificate.id,
      },
      data: {
        ...prismaCertificate.certificate,
      },
    });
  }

  async findById(id: string): Promise<Certificate | null> {
    const certificate = await this.prismaService.certificate.findFirst({
      where: {
        id,
      },
      include: {
        documents: true,
      },
    });

    if (!certificate) {
      return null;
    }

    return CertificateMapper.toDomain(certificate, certificate.documents);
  }
  fetchAll(): Promise<Certificate[]> {
    throw new Error('Method not implemented.');
  }
}

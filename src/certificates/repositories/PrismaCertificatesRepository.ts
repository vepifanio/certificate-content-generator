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
      },
    });
  }

  async save(certificate: Certificate): Promise<void> {
    const prismaCertificate = CertificateMapper.toPrisma(certificate);

    await this.prismaService.$transaction([
      this.prismaService.document.createMany({
        data: prismaCertificate.documents,
        skipDuplicates: true,
      }),
      this.prismaService.certificate.update({
        where: {
          id: prismaCertificate.certificate.id,
        },
        data: {
          ...prismaCertificate.certificate,
          documents: {
            set: prismaCertificate.documents,
          },
        },
        include: {
          documents: true,
        },
      }),
    ]);
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

  async fetchAll({ page }: { page: number }): Promise<Certificate[]> {
    const ITEMS_PER_PAGE = 10;

    const prismaCertificates = await this.prismaService.certificate.findMany({
      include: {
        documents: true,
      },
      take: ITEMS_PER_PAGE,
      skip: (page - 1) * ITEMS_PER_PAGE,
    });

    const certificates = prismaCertificates.map((prismaCertificate) =>
      CertificateMapper.toDomain(
        prismaCertificate,
        prismaCertificate.documents,
      ),
    );

    return certificates;
  }

  async fetchAllByDocument({
    document,
    page,
  }: {
    document: string;
    page: number;
  }): Promise<Certificate[]> {
    const ITEMS_PER_PAGE = 10;

    const prismaCertificates = await this.prismaService.certificate.findMany({
      where: {
        documents: {
          some: {
            identifier: document,
          },
        },
      },
      include: {
        documents: true,
      },
      take: ITEMS_PER_PAGE,
      skip: (page - 1) * ITEMS_PER_PAGE,
    });

    const certificates = prismaCertificates.map((prismaCertificate) =>
      CertificateMapper.toDomain(
        prismaCertificate,
        prismaCertificate.documents,
      ),
    );

    return certificates;
  }

  async delete(certificate: Certificate): Promise<void> {
    await this.prismaService.certificate.delete({
      where: {
        id: certificate.getId(),
      },
    });
  }
}

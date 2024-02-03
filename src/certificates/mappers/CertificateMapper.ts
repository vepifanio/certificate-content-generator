import { Certificate } from '../entities/certificate.entity';
import { Certificate as PrismaCertificate } from '@prisma/client';

export class CertificateMapper {
  static toPrisma(certificate: Certificate): PrismaCertificate {
    return {
      id: certificate.getId(),
      title: certificate.getTitle(),
      content: certificate.getContent(),
      initialDate: new Date(certificate.getInitialDate()),
      endDate: certificate.getEndDate()
        ? new Date(certificate.getEndDate())
        : undefined,
      hours: certificate.getHours(),
      createdAt: certificate.getCreatedAt(),
      updatedAt: certificate.getUpdatedAt(),
    };
  }

  static toDomain(prismaCertificate: PrismaCertificate): Certificate {
    const {
      id,
      title,
      content,
      initialDate,
      endDate,
      hours,
      createdAt,
      updatedAt,
    } = prismaCertificate;
    return new Certificate(
      id,
      title,
      content,
      initialDate,
      endDate,
      hours,
      createdAt,
      updatedAt,
    );
  }
}

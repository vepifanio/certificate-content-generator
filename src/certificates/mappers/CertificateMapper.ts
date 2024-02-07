import { Certificate } from '../entities/certificate.entity';
import {
  Certificate as PrismaCertificate,
  Document as PrismaDocument,
} from '@prisma/client';
import { Document } from '../entities/document.entity';

export class CertificateMapper {
  static toPrisma(certificate: Certificate): {
    certificate: PrismaCertificate;
    documents: PrismaDocument[];
  } {
    const documents: PrismaDocument[] = certificate
      .getDocuments()
      .map((document) => ({
        identifier: document.getIdentifier(),
      }));

    return {
      certificate: {
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
      },
      documents,
    };
  }

  static toDomain(
    prismaCertificate: PrismaCertificate,
    documents: PrismaDocument[],
  ): Certificate {
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

    const certificateDocuments = documents.map(
      (document) => new Document(document.identifier),
    );

    return new Certificate(
      id,
      title,
      content,
      initialDate,
      endDate,
      hours,
      certificateDocuments,
      createdAt,
      updatedAt,
    );
  }
}

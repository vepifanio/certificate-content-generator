import { Certificate } from '../entities/certificate.entity';
import { Document } from '../entities/document.entity';

interface CreateCertificateData {
  title?: string;
  content?: string;
  initialDate?: Date;
  endDate?: Date;
  hours?: number;
  documents?: string[];
}

export function certificateFactory(
  data: CreateCertificateData = {},
): Certificate {
  const { title, content, initialDate, endDate, hours, documents } = data;
  const certificate = Certificate.create(
    title || 'title',
    content || 'content',
    initialDate || new Date(),
    endDate,
    hours || 1,
  );

  documents &&
    documents.forEach((document) => {
      certificate.setDocuments([
        ...certificate.getDocuments(),
        new Document(document),
      ]);
    });

  return certificate;
}

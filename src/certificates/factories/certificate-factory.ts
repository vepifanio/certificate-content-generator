import { Certificate } from '../entities/certificate.entity';

interface CreateCertificateData {
  title?: string;
  content?: string;
  initialDate?: Date;
  endDate?: Date;
  hours?: number;
}

export function certificateFactory(
  data: CreateCertificateData = {},
): Certificate {
  const { title, content, initialDate, endDate, hours } = data;
  return Certificate.create(
    title || 'title',
    content || 'content',
    initialDate || new Date(),
    endDate,
    hours || 1,
  );
}

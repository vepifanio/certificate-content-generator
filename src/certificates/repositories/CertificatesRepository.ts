import { Certificate } from '../entities/certificate.entity';

export abstract class CertificatesRepository {
  abstract create(certificate: Certificate): Promise<void>;
  abstract save(certificate: Certificate): Promise<void>;
  abstract findById(id: string): Promise<Certificate | null>;
  abstract fetchAll(data: { page: number }): Promise<Certificate[]>;
  abstract fetchAllByDocument(data: {
    document: string;
    page: number;
  }): Promise<Certificate[]>;
  abstract delete(certificate: Certificate): Promise<void>;
}

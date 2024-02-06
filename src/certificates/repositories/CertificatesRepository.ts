import { Certificate } from '../entities/certificate.entity';

export abstract class CertificatesRepository {
  abstract create(certificate: Certificate): Promise<void>;
  abstract save(certificate: Certificate): Promise<void>;
  abstract findById(id: string): Promise<Certificate | null>;
  abstract fetchAll(): Promise<Certificate[]>;
}

import { Certificate } from '../entities/certificate.entity';
import { CertificatesRepository } from './CertificatesRepository';

export class InMemoryCertificatesRepository implements CertificatesRepository {
  public items: Certificate[] = [];

  create(certificate: Certificate): Promise<void> {
    throw new Error('Method not implemented.');
  }
  save(certificate: Certificate): Promise<void> {
    throw new Error('Method not implemented.');
  }
  findById(id: string): Promise<Certificate> {
    throw new Error('Method not implemented.');
  }
  async fetchAll(): Promise<Certificate[]> {
    return this.items;
  }
}

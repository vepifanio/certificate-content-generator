import { Certificate } from '../entities/certificate.entity';
import { CertificatesRepository } from './CertificatesRepository';

export class InMemoryCertificatesRepository implements CertificatesRepository {
  public items: Certificate[] = [];

  async create(certificate: Certificate): Promise<void> {
    this.items.push(certificate);
  }

  async save(certificate: Certificate): Promise<void> {
    const certificateIdx = this.items.findIndex(
      (item) => item.getId() === certificate.getId(),
    );

    this.items[certificateIdx] = certificate;
  }

  async findById(id: string): Promise<Certificate | null> {
    return this.items.find((item) => item.getId() === id) || null;
  }

  async fetchAll(): Promise<Certificate[]> {
    return this.items;
  }
}

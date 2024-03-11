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

  async fetchAll({ page }: { page: number }): Promise<Certificate[]> {
    const ITEMS_PER_PAGE = 10;
    const start = (page - 1) * ITEMS_PER_PAGE;
    const end = start + ITEMS_PER_PAGE;
    return this.items.slice(start, end);
  }

  async fetchAllByDocument({
    document,
    page,
  }: {
    document: string;
    page: number;
  }): Promise<Certificate[]> {
    const ITEMS_PER_PAGE = 10;
    const start = (page - 1) * ITEMS_PER_PAGE;
    const end = start + ITEMS_PER_PAGE;
    const filteredItems = this.items.filter((item) =>
      item.getDocuments().find((doc) => doc.getIdentifier() === document),
    );
    return filteredItems.slice(start, end);
  }

  async delete(certificate: Certificate): Promise<void> {
    const updatedItems = this.items.filter(
      (item) => item.getId() !== certificate.getId(),
    );

    this.items = updatedItems;
  }
}

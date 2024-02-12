import { Injectable } from '@nestjs/common';
import { CertificatesRepository } from '../repositories/CertificatesRepository';

@Injectable()
export class FindOneCertificateService {
  constructor(private certificatesRepository: CertificatesRepository) {}

  async execute(id: string) {
    const certificate = await this.certificatesRepository.findById(id);

    if (!certificate) {
      throw new Error('Certificate not found.');
    }
    return {
      id: certificate.getId(),
      title: certificate.getTitle(),
      content: certificate.getContent(),
      initialDate: certificate.getInitialDate(),
      endDate: certificate.getEndDate() ? certificate.getEndDate() : undefined,
      hours: certificate.getHours(),
      documents: certificate.getDocuments(),
    };
  }
}

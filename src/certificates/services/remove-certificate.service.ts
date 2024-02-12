import { Injectable } from '@nestjs/common';
import { CertificatesRepository } from '../repositories/CertificatesRepository';

@Injectable()
export class RemoveCertificateService {
  constructor(private certificatesRepository: CertificatesRepository) {}

  async execute(id: string) {
    const certificate = await this.certificatesRepository.findById(id);
    if (!certificate) {
      throw new Error('Certificate not found.');
    }

    await this.certificatesRepository.delete(certificate);

    return id;
  }
}

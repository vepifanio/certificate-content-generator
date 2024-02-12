import { Injectable } from '@nestjs/common';
import { CertificatesRepository } from '../repositories/CertificatesRepository';

@Injectable()
export class FindAllCertificatesService {
  constructor(private certificatesRepository: CertificatesRepository) {}

  async execute() {
    const certificates = await this.certificatesRepository.fetchAll();
    return certificates;
  }
}

import { Injectable } from '@nestjs/common';
import { CertificatesRepository } from '../repositories/CertificatesRepository';
import { FindAllCertificatesDto } from '../dto/find-all-certificates.dto';

@Injectable()
export class FindAllCertificatesService {
  constructor(private certificatesRepository: CertificatesRepository) {}

  async execute(findAllCertificatesDto?: FindAllCertificatesDto) {
    const page = findAllCertificatesDto?.page;

    const certificates = await this.certificatesRepository.fetchAll({
      page: page > 0 ? page : 1,
    });
    return certificates;
  }
}

import { Injectable } from '@nestjs/common';
import { CertificatesRepository } from '../repositories/CertificatesRepository';
import { FindCertificatesByDocumentDto } from '../dto/find-certificates-by-document';

@Injectable()
export class FindCertificatesByDocumentService {
  constructor(private certificatesRepository: CertificatesRepository) {}

  async execute({ document, page }: FindCertificatesByDocumentDto) {
    const certificates = await this.certificatesRepository.fetchAllByDocument({
      document,
      page: page > 0 ? page : 1,
    });

    return certificates;
  }
}

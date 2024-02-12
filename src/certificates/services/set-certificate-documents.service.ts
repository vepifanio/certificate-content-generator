import { Injectable } from '@nestjs/common';
import { CertificatesRepository } from '../repositories/CertificatesRepository';
import { SetDocumentsToCertificateDto } from '../dto/set-documents-to-certificate-dto';
import { Document } from '../entities/document.entity';

@Injectable()
export class SetCertificateDocumentsService {
  constructor(private certificatesRepository: CertificatesRepository) {}

  async execute(
    id: string,
    setDocumentsToCertificateDto: SetDocumentsToCertificateDto,
  ) {
    const certificate = await this.certificatesRepository.findById(id);

    if (!certificate) {
      throw new Error('Certificate not found.');
    }

    const documentsToBeAdded = setDocumentsToCertificateDto.documents.map(
      (document) => new Document(document),
    );
    certificate.setDocuments([...documentsToBeAdded]);

    return this.certificatesRepository.save(certificate);
  }
}

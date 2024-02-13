import { Injectable } from '@nestjs/common';
import { CertificatesRepository } from '../repositories/CertificatesRepository';
import { GenerateCertificateContentDto } from '../dto/generate-certificate-content.dto';

@Injectable()
export class GenerateCertificateContentService {
  constructor(private certificatesRepository: CertificatesRepository) {}

  async execute(
    id: string,
    generateCertificateContentDto: GenerateCertificateContentDto,
  ) {
    const certificate = await this.certificatesRepository.findById(id);
    const { document, variables } = generateCertificateContentDto;

    if (!certificate) {
      throw new Error('Certificate not found.');
    }

    if (
      !certificate
        .getDocuments()
        .find((certDoc) => certDoc.getIdentifier() === document)
    ) {
      throw new Error('Document not allowed to generate this certificate.');
    }

    const generatedContent = certificate.resolveContent(variables);
    return generatedContent;
  }
}

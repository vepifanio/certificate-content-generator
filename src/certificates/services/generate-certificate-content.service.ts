import { Injectable } from '@nestjs/common';
import { CertificatesRepository } from '../repositories/CertificatesRepository';

interface GenerateContentVariables {
  document: string;
  [key: string]: string;
}

@Injectable()
export class GenerateCertificateContentService {
  constructor(private certificatesRepository: CertificatesRepository) {}

  async execute(id: string, variables: GenerateContentVariables) {
    const certificate = await this.certificatesRepository.findById(id);
    const { document } = variables;

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

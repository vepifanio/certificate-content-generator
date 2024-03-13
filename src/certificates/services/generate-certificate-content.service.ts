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
    const { document } = generateCertificateContentDto;

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

    const variablesToResolve: { [key: string]: string | number } = Object.keys(
      generateCertificateContentDto,
    ).reduce((obj, key) => {
      if (key === 'document') {
        return {
          ...obj,
          document: generateCertificateContentDto[key].replace(
            /(\d{3})(\d{3})(\d{3})(\d{2})/,
            '$1.$2.$3-$4',
          ),
        };
      }

      return {
        ...obj,
        [key]: generateCertificateContentDto[key],
      };
    }, {});
    const generatedContent = certificate.resolveContent(variablesToResolve);
    return generatedContent;
  }
}

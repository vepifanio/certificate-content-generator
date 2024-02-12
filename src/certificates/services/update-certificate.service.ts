import { Injectable } from '@nestjs/common';
import { CertificatesRepository } from '../repositories/CertificatesRepository';
import { UpdateCertificateDto } from '../dto/update-certificate.dto';

@Injectable()
export class UpdateCertificateService {
  constructor(private certificatesRepository: CertificatesRepository) {}

  async execute(id: string, updateCertificateDto: UpdateCertificateDto) {
    const { title, content, hours, initialDate, endDate } =
      updateCertificateDto;

    const certificate = await this.certificatesRepository.findById(id);

    if (!certificate) {
      throw new Error('Certificate not found.');
    }

    title && certificate.setTitle(title);
    content && certificate.setContent(content);
    hours && certificate.setHours(hours);
    initialDate && certificate.setInitialDate(initialDate);
    endDate && certificate.setEndDate(endDate);

    await this.certificatesRepository.save(certificate);

    return certificate;
  }
}

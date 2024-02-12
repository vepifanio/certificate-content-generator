import { Injectable } from '@nestjs/common';
import { CertificatesRepository } from '../repositories/CertificatesRepository';
import { CreateCertificateDto } from '../dto/create-certificate.dto';
import { Certificate } from '../entities/certificate.entity';

@Injectable()
export class CreateCertificateService {
  constructor(private certificatesRepository: CertificatesRepository) {}

  async execute(createCertificateDto: CreateCertificateDto) {
    const { title, content, hours, initialDate, endDate } =
      createCertificateDto;
    const certificate = Certificate.create(
      title,
      content,
      initialDate,
      endDate,
      hours,
    );

    await this.certificatesRepository.create(certificate);
    return certificate;
  }
}

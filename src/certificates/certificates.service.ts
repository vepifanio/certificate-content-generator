import { Injectable } from '@nestjs/common';
import { CreateCertificateDto } from './dto/create-certificate.dto';
import { UpdateCertificateDto } from './dto/update-certificate.dto';
import { Certificate } from './entities/certificate.entity';
import { CertificatesRepository } from './repositories/CertificatesRepository';

interface GenerateContentVariables {
  [key: string]: string;
}

@Injectable()
export class CertificatesService {
  constructor(private certificatesRepository: CertificatesRepository) {}

  async create(createCertificateDto: CreateCertificateDto) {
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

  findAll() {
    return `This action returns all certificates`;
  }

  findOne(id: string) {
    return `This action returns a #${id} certificate`;
  }

  async generate(id: string, variables: GenerateContentVariables) {
    const certificate = await this.certificatesRepository.findById(id);

    if (!certificate) {
      throw new Error('Certificate not found.');
    }

    const generatedContent = certificate.resolveContent(variables);

    return generatedContent;
  }

  update(id: string, updateCertificateDto: UpdateCertificateDto) {
    return `This action updates a #${id} certificate`;
  }

  remove(id: number) {
    return `This action removes a #${id} certificate`;
  }
}

import { Injectable } from '@nestjs/common';
import { CreateCertificateDto } from './dto/create-certificate.dto';
import { UpdateCertificateDto } from './dto/update-certificate.dto';
import { Certificate } from './entities/certificate.entity';
import { CertificatesRepository } from './repositories/CertificatesRepository';
import { SetDocumentsToCertificateDto } from './dto/set-documents-to-certificate-dto';
import { Document } from './entities/document.entity';

interface GenerateContentVariables {
  document: string;
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

  async setDocuments(
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

  async findAll() {
    const certificates = await this.certificatesRepository.fetchAll();
    return certificates;
  }

  async findOne(id: string) {
    const certificate = await this.certificatesRepository.findById(id);

    if (!certificate) {
      throw new Error('Certificate not found.');
    }
    return {
      id: certificate.getId(),
      title: certificate.getTitle(),
      content: certificate.getContent(),
      initialDate: certificate.getInitialDate(),
      endDate: certificate.getEndDate() ? certificate.getEndDate() : undefined,
      hours: certificate.getHours(),
      documents: certificate.getDocuments(),
    };
  }

  async generate(id: string, variables: GenerateContentVariables) {
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

  async update(id: string, updateCertificateDto: UpdateCertificateDto) {
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

    return {
      certificate,
    };
  }

  async remove(id: string) {
    const certificate = await this.certificatesRepository.findById(id);
    if (!certificate) {
      throw new Error('Certificate not found.');
    }

    await this.certificatesRepository.delete(certificate);

    return id;
  }
}

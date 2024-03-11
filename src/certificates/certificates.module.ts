import { Module } from '@nestjs/common';
import { CertificatesController } from './certificates.controller';
import { PrismaModule } from 'src/prisma.module';
import { CreateCertificateService } from './services/create-certificate.service';
import { SetCertificateDocumentsService } from './services/set-certificate-documents.service';
import { FindOneCertificateService } from './services/find-one-certificate.service';
import { FindAllCertificatesService } from './services/find-all-certificates.service';
import { UpdateCertificateService } from './services/update-certificate.service';
import { RemoveCertificateService } from './services/remove-certificate.service';
import { GenerateCertificateContentService } from './services/generate-certificate-content.service';
import { FindCertificatesByDocumentService } from './services/find-certificates-by-document.service';

@Module({
  imports: [PrismaModule],
  controllers: [CertificatesController],
  providers: [
    CreateCertificateService,
    SetCertificateDocumentsService,
    FindOneCertificateService,
    FindAllCertificatesService,
    FindCertificatesByDocumentService,
    UpdateCertificateService,
    RemoveCertificateService,
    GenerateCertificateContentService,
  ],
  exports: [FindCertificatesByDocumentService],
})
export class CertificatesModule {}

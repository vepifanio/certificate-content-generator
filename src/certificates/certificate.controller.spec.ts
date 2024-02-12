import { Test } from '@nestjs/testing';
import { CertificatesController } from './certificates.controller';
import { CertificatesRepository } from './repositories/CertificatesRepository';
import { InMemoryCertificatesRepository } from './repositories/InMemoryCertificatesRepository';
import { certificateFactory } from './factories/certificate-factory';
import { CreateCertificateService } from './services/create-certificate.service';
import { SetCertificateDocumentsService } from './services/set-certificate-documents.service';
import { FindOneCertificateService } from './services/find-one-certificate.service';
import { FindAllCertificatesService } from './services/find-all-certificates.service';
import { UpdateCertificateService } from './services/update-certificate.service';
import { RemoveCertificateService } from './services/remove-certificate.service';

describe('Certificates controller', () => {
  let certificatesController: CertificatesController;
  let certificatesRepository: InMemoryCertificatesRepository;

  const defaultCertificate = certificateFactory();

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [
        {
          module: class FakeClass {},
          providers: [
            {
              provide: CertificatesRepository,
              useClass: InMemoryCertificatesRepository,
            },
          ],
          exports: [CertificatesRepository],
        },
      ],
      controllers: [CertificatesController],
      providers: [
        CreateCertificateService,
        SetCertificateDocumentsService,
        FindOneCertificateService,
        FindAllCertificatesService,
        UpdateCertificateService,
        RemoveCertificateService,
      ],
    }).compile();

    certificatesController = moduleRef.get<CertificatesController>(
      CertificatesController,
    );
    certificatesRepository = moduleRef.get<InMemoryCertificatesRepository>(
      CertificatesRepository,
    );
  });
});

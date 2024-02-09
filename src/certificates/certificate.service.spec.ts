import { Test } from '@nestjs/testing';
import { CertificatesController } from './certificates.controller';
import { CertificatesService } from './certificates.service';
import { CertificatesRepository } from './repositories/CertificatesRepository';
import { InMemoryCertificatesRepository } from './repositories/InMemoryCertificatesRepository';
import { certificateFactory } from './factories/certificate-factory';

describe('Certificates controller', () => {
  let certificatesController: CertificatesController;
  // let certificatesService: CertificatesService;
  let certificatesRepository: InMemoryCertificatesRepository;

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
      providers: [CertificatesService],
    }).compile();

    // certificatesService =
    //   moduleRef.get<CertificatesService>(CertificatesService);
    certificatesController = moduleRef.get<CertificatesController>(
      CertificatesController,
    );
    certificatesRepository = moduleRef.get<InMemoryCertificatesRepository>(
      CertificatesRepository,
    );
  });

  describe('findAll', () => {
    it('should be able to list all certificates', async () => {
      const certificate = certificateFactory();
      certificatesRepository.items.push(certificate);
      const result = await certificatesController.findAll();
      expect(result.certificates.length).toBe(1);
      expect(result.certificates).toEqual([
        expect.objectContaining({
          id: certificate.getId(),
        }),
      ]);
    });
  });
});

import { Test } from '@nestjs/testing';
import { CertificatesRepository } from '../repositories/CertificatesRepository';
import { InMemoryCertificatesRepository } from '../repositories/InMemoryCertificatesRepository';
import { FindOneCertificateService } from './find-one-certificate.service';
import { certificateFactory } from '../factories/certificate-factory';

describe('Find one certificate', () => {
  let sut: FindOneCertificateService;
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
      providers: [FindOneCertificateService],
    }).compile();

    sut = moduleRef.get<FindOneCertificateService>(FindOneCertificateService);
    certificatesRepository = moduleRef.get<InMemoryCertificatesRepository>(
      CertificatesRepository,
    );
  });

  it('should be able to find a previously created certificate', async () => {
    certificatesRepository.items.push(defaultCertificate);

    const searchedCertificate = await sut.execute(defaultCertificate.getId());

    expect(searchedCertificate).toEqual(
      expect.objectContaining({
        id: defaultCertificate.getId(),
      }),
    );
  });

  it('should not be able to find a non created certificate', async () => {
    await expect(() => sut.execute('non-existent-id')).rejects.toThrow(
      new Error('Certificate not found.'),
    );
  });
});

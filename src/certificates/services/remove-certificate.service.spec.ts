import { Test } from '@nestjs/testing';
import { CertificatesRepository } from '../repositories/CertificatesRepository';
import { InMemoryCertificatesRepository } from '../repositories/InMemoryCertificatesRepository';
import { certificateFactory } from '../factories/certificate-factory';
import { RemoveCertificateService } from './remove-certificate.service';

describe('Find one certificate', () => {
  let sut: RemoveCertificateService;
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
      providers: [RemoveCertificateService],
    }).compile();

    sut = moduleRef.get<RemoveCertificateService>(RemoveCertificateService);
    certificatesRepository = moduleRef.get<InMemoryCertificatesRepository>(
      CertificatesRepository,
    );
  });

  it('should be able to remove a certificate', async () => {
    certificatesRepository.items.push(defaultCertificate);

    const result = await sut.execute(defaultCertificate.getId());

    expect(certificatesRepository.items).toHaveLength(0);
    expect(result).toBe(defaultCertificate.getId());
  });

  it('should not be able to remove a non-existent certificate', async () => {
    await expect(() => sut.execute('non-existent-id')).rejects.toThrow(
      new Error('Certificate not found.'),
    );
  });
});

import { Test } from '@nestjs/testing';
import { certificateFactory } from '../factories/certificate-factory';
import { InMemoryCertificatesRepository } from '../repositories/InMemoryCertificatesRepository';
import { FindAllCertificatesService } from './find-all-certificates.service';
import { CertificatesRepository } from '../repositories/CertificatesRepository';

describe('Find all certificates', () => {
  let sut: FindAllCertificatesService;
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
      providers: [FindAllCertificatesService],
    }).compile();

    sut = moduleRef.get<FindAllCertificatesService>(FindAllCertificatesService);
    certificatesRepository = moduleRef.get<InMemoryCertificatesRepository>(
      CertificatesRepository,
    );
  });

  it('should be able to list all certificates', async () => {
    certificatesRepository.items.push(defaultCertificate);
    const result = await sut.execute();
    expect(result.length).toBe(1);
    expect(result).toEqual([
      expect.objectContaining({
        id: defaultCertificate.getId(),
      }),
    ]);
  });
});

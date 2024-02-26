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

  it('should be able to list all certificates with pagination', async () => {
    for (let i = 0; i < 13; i++) {
      certificatesRepository.items.push(certificateFactory());
    }

    const result = await sut.execute();
    expect(result.length).toBe(10);

    const pageTwoResult = await sut.execute({ page: 2 });
    expect(pageTwoResult.length).toBe(3);
  });

  it('should be able to return the first page of results if a negative number is received', async () => {
    certificatesRepository.items.push(defaultCertificate);
    const result = await sut.execute({ page: -1 });

    expect(result.length).toBe(1);
  });

  it('should be able to return a empty list of results if the actual page number is smaller than the page number received', async () => {
    certificatesRepository.items.push(defaultCertificate);
    const result = await sut.execute({ page: 2 });

    expect(result.length).toBe(0);
  });
});

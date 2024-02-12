import { Test } from '@nestjs/testing';
import { CertificatesRepository } from '../repositories/CertificatesRepository';
import { InMemoryCertificatesRepository } from '../repositories/InMemoryCertificatesRepository';
import { CreateCertificateService } from './create-certificate.service';

describe('Create Certificate', () => {
  let sut: CreateCertificateService;
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
      providers: [CreateCertificateService],
    }).compile();

    sut = moduleRef.get<CreateCertificateService>(CreateCertificateService);

    certificatesRepository = moduleRef.get<InMemoryCertificatesRepository>(
      CertificatesRepository,
    );
  });

  it('should be able to create a new certificate', async () => {
    const result = await sut.execute({
      title: 'new certificate',
      content: 'new certificate content',
      hours: 2,
      initialDate: new Date(),
    });

    expect(certificatesRepository.items).toHaveLength(1);
    expect(certificatesRepository.items[0]).toEqual(
      expect.objectContaining({
        id: result.getId(),
        title: 'new certificate',
        content: 'new certificate content',
        hours: 2,
        initialDate: result.getInitialDate(),
        endDate: result.getEndDate(),
      }),
    );
  });
});

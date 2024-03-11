import { Test } from '@nestjs/testing';
import { certificateFactory } from '../factories/certificate-factory';
import { CertificatesRepository } from '../repositories/CertificatesRepository';
import { InMemoryCertificatesRepository } from '../repositories/InMemoryCertificatesRepository';
import { FindCertificatesByDocumentService } from './find-certificates-by-document.service';

describe('Find certificates by document', () => {
  let sut: FindCertificatesByDocumentService;
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
      providers: [FindCertificatesByDocumentService],
    }).compile();

    sut = moduleRef.get<FindCertificatesByDocumentService>(
      FindCertificatesByDocumentService,
    );
    certificatesRepository = moduleRef.get<InMemoryCertificatesRepository>(
      CertificatesRepository,
    );
  });

  it('should be able to list all certificates for the given document', async () => {
    certificatesRepository.items.push(
      certificateFactory({ documents: ['11111111111'] }),
      certificateFactory({ documents: ['11111111111', '33333333333'] }),
      certificateFactory({ documents: ['22222222222'] }),
    );
    const result = await sut.execute({
      document: '11111111111',
    });
    expect(result.length).toBe(2);
  });

  it('should be return a empty list when there are no certificates for the given document', async () => {
    certificatesRepository.items.push(
      certificateFactory({ documents: ['11111111111'] }),
      certificateFactory({ documents: ['11111111111', '33333333333'] }),
      certificateFactory({ documents: ['22222222222'] }),
    );
    const result = await sut.execute({
      document: '44444444444',
    });
    expect(result.length).toBe(0);
  });
});

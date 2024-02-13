import { Test } from '@nestjs/testing';
import { InMemoryCertificatesRepository } from '../repositories/InMemoryCertificatesRepository';
import { GenerateCertificateContentService } from './generate-certificate-content.service';
import { CertificatesRepository } from '../repositories/CertificatesRepository';
import { certificateFactory } from '../factories/certificate-factory';

describe('Generate certificate content', () => {
  let sut: GenerateCertificateContentService;
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
      providers: [GenerateCertificateContentService],
    }).compile();

    sut = moduleRef.get<GenerateCertificateContentService>(
      GenerateCertificateContentService,
    );
    certificatesRepository = moduleRef.get<InMemoryCertificatesRepository>(
      CertificatesRepository,
    );
  });

  it('should be able to generate the content of a certficate', async () => {
    const certificate = certificateFactory({
      documents: ['12345678909'],
    });
    certificatesRepository.items.push(certificate);
    const content = await sut.execute(certificate.getId(), {
      document: '12345678909',
      variables: {
        name: 'test',
        age: 'age test',
      },
    });

    expect(content).toEqual(expect.any(String));
  });

  it('should not be able to generate the content of a inexistent certificate', async () => {
    await expect(() =>
      sut.execute('non-existent-id', {
        document: '12345678909',
      }),
    ).rejects.toThrow(new Error('Certificate not found.'));
  });

  it("should not be able to generate the content of a certificate if the given document is not on certificate's documents", async () => {
    const certificate = certificateFactory({
      documents: ['12345678909'],
    });
    certificatesRepository.items.push(certificate);

    await expect(() =>
      sut.execute(certificate.getId(), {
        document: '111111111111',
      }),
    ).rejects.toThrow(
      new Error('Document not allowed to generate this certificate.'),
    );
  });
});

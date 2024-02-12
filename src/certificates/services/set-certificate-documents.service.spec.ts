import { Test } from '@nestjs/testing';
import { CertificatesRepository } from '../repositories/CertificatesRepository';
import { InMemoryCertificatesRepository } from '../repositories/InMemoryCertificatesRepository';
import { SetCertificateDocumentsService } from './set-certificate-documents.service';
import { certificateFactory } from '../factories/certificate-factory';

describe('Create Certificate', () => {
  let sut: SetCertificateDocumentsService;
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
      providers: [SetCertificateDocumentsService],
    }).compile();

    sut = moduleRef.get<SetCertificateDocumentsService>(
      SetCertificateDocumentsService,
    );

    certificatesRepository = moduleRef.get<InMemoryCertificatesRepository>(
      CertificatesRepository,
    );
  });

  it('should be able to set documents to a certificate', async () => {
    certificatesRepository.items.push(defaultCertificate);

    await sut.execute(defaultCertificate.getId(), {
      documents: ['11111111111', '22222222222'],
    });

    const certificateDocuments = certificatesRepository.items[0].getDocuments();

    expect(certificateDocuments).toHaveLength(2);
    expect(certificateDocuments[0].getIdentifier()).toBe('11111111111');
    expect(certificateDocuments[1].getIdentifier()).toBe('22222222222');
  });

  it('should be able to remove all documents when a empty documents array is received', async () => {
    const certificate = certificateFactory({
      documents: ['11111111111', '22222222222'],
    });

    certificatesRepository.items.push(certificate);

    await sut.execute(certificate.getId(), {
      documents: [],
    });

    const certificateDocuments = certificatesRepository.items[0].getDocuments();

    expect(certificateDocuments).toHaveLength(0);
  });

  it('should not be able to update a non-existend certificate', async () => {
    await expect(() =>
      sut.execute('non-existent-id', {
        documents: [],
      }),
    ).rejects.toThrow(new Error('Certificate not found.'));
  });
});

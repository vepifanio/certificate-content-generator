import { Test } from '@nestjs/testing';
import { CertificatesRepository } from '../repositories/CertificatesRepository';
import { InMemoryCertificatesRepository } from '../repositories/InMemoryCertificatesRepository';
import { certificateFactory } from '../factories/certificate-factory';
import { UpdateCertificateService } from './update-certificate.service';

describe('Find one certificate', () => {
  let sut: UpdateCertificateService;
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
      providers: [UpdateCertificateService],
    }).compile();

    sut = moduleRef.get<UpdateCertificateService>(UpdateCertificateService);
    certificatesRepository = moduleRef.get<InMemoryCertificatesRepository>(
      CertificatesRepository,
    );
  });

  it('should be able to update a certificate', async () => {
    certificatesRepository.items.push(defaultCertificate);

    await sut.execute(defaultCertificate.getId(), {
      title: 'new title',
      content: 'new content',
      hours: 10,
    });

    const updatedCertificate = certificatesRepository.items[0];

    expect(updatedCertificate.getTitle()).toBe('new title');
    expect(updatedCertificate.getContent()).toBe('new content');
    expect(updatedCertificate.getInitialDate()).toBe(
      defaultCertificate.getInitialDate(),
    );
  });

  it('should not be able to update a non-existend certificate', async () => {
    await expect(() => sut.execute('non-existent-id', {})).rejects.toThrow(
      new Error('Certificate not found.'),
    );
  });
});

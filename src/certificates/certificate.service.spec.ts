import { Test } from '@nestjs/testing';
import { CertificatesController } from './certificates.controller';
import { CertificatesService } from './certificates.service';
import { CertificatesRepository } from './repositories/CertificatesRepository';
import { InMemoryCertificatesRepository } from './repositories/InMemoryCertificatesRepository';
import { certificateFactory } from './factories/certificate-factory';

describe('Certificates controller', () => {
  let certificatesController: CertificatesController;
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
      controllers: [CertificatesController],
      providers: [CertificatesService],
    }).compile();

    certificatesController = moduleRef.get<CertificatesController>(
      CertificatesController,
    );
    certificatesRepository = moduleRef.get<InMemoryCertificatesRepository>(
      CertificatesRepository,
    );
  });

  describe('create', () => {
    it('should be able to create a new certificate', async () => {
      const result = await certificatesController.create({
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

  describe('findOne', () => {
    it('should be able to find a previously created certificate', async () => {
      certificatesRepository.items.push(defaultCertificate);

      const searchedCertificate = await certificatesController.findOne(
        defaultCertificate.getId(),
      );

      expect(searchedCertificate).toEqual(
        expect.objectContaining({
          id: defaultCertificate.getId(),
        }),
      );
    });

    it('should not be able to find a non created certificate', async () => {
      await expect(() =>
        certificatesController.findOne('non-existent-id'),
      ).rejects.toThrow(new Error('Certificate not found.'));
    });
  });

  describe('findAll', () => {
    it('should be able to list all certificates', async () => {
      certificatesRepository.items.push(defaultCertificate);
      const result = await certificatesController.findAll();
      expect(result.certificates.length).toBe(1);
      expect(result.certificates).toEqual([
        expect.objectContaining({
          id: defaultCertificate.getId(),
        }),
      ]);
    });
  });

  describe('update', () => {
    it('should be able to update a certificate', async () => {
      certificatesRepository.items.push(defaultCertificate);

      await certificatesController.update(defaultCertificate.getId(), {
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
      await expect(() =>
        certificatesController.update('non-existent-id', {}),
      ).rejects.toThrow(new Error('Certificate not found.'));
    });
  });

  describe('setDocuments', () => {
    it('should be able to set documents to a certificate', async () => {
      certificatesRepository.items.push(defaultCertificate);

      await certificatesController.setDocuments(defaultCertificate.getId(), {
        documents: ['11111111111', '22222222222'],
      });

      const certificateDocuments =
        certificatesRepository.items[0].getDocuments();

      expect(certificateDocuments).toHaveLength(2);
      expect(certificateDocuments[0].getIdentifier()).toBe('11111111111');
      expect(certificateDocuments[1].getIdentifier()).toBe('22222222222');
    });

    it('should be able to remove all documents when a empty documents array is received', async () => {
      const certificate = certificateFactory({
        documents: ['11111111111', '22222222222'],
      });

      certificatesRepository.items.push(certificate);

      await certificatesController.setDocuments(certificate.getId(), {
        documents: [],
      });

      const certificateDocuments =
        certificatesRepository.items[0].getDocuments();

      expect(certificateDocuments).toHaveLength(0);
    });

    it('should not be able to update a non-existend certificate', async () => {
      await expect(() =>
        certificatesController.setDocuments('non-existent-id', {
          documents: [],
        }),
      ).rejects.toThrow(new Error('Certificate not found.'));
    });
  });

  describe('remove', () => {
    it('should be able to remove a certificate', async () => {
      certificatesRepository.items.push(defaultCertificate);

      const result = await certificatesController.remove(
        defaultCertificate.getId(),
      );

      expect(certificatesRepository.items).toHaveLength(0);
      expect(result.deleted).toBe(defaultCertificate.getId());
    });

    it('should not be able to remove a non-existent certificate', async () => {
      await expect(() =>
        certificatesController.remove('non-existent-id'),
      ).rejects.toThrow(new Error('Certificate not found.'));
    });
  });
});

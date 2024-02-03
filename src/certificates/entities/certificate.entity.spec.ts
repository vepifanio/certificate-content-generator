import { Certificate } from './certificate.entity';

describe('Certificate', () => {
  it('should be able to create a new certificate', () => {
    const certificate = Certificate.create(
      'new certificate',
      'content',
      new Date(),
      undefined,
      4,
    );

    expect(certificate.getId()).toEqual(expect.any(String));
  });

  it("should be able to generate the certificate's content with the given variables", () => {
    const certificate = Certificate.create(
      'new certificate',
      'My name is [[name]]',
      new Date(),
      undefined,
      4,
    );

    const resolvedContent = certificate.resolveContent({ name: 'Victor' });
    expect(resolvedContent).toBe('My name is Victor');
  });

  it("should not be able to generate the certificate's content with missing content required variables", () => {
    const certificate = Certificate.create(
      'new certificate',
      'My name is [[name]]',
      new Date(),
      undefined,
      4,
    );

    expect(() => certificate.resolveContent()).toThrow(
      'Some required content variables are undefined: name',
    );
  });
});

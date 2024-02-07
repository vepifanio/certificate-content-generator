import { Certificate } from './certificate.entity';

describe('Certificate', () => {
  it('should be able to create a new certificate', () => {
    const currentDate = new Date();

    const certificate = Certificate.create(
      'new certificate',
      'content',
      new Date(),
      new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() + 1,
        currentDate.getDate(),
      ),
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

  it('should not be able to create a certificate with the given end date after the given initial date', () => {
    const currentDate = new Date();

    expect(() =>
      Certificate.create(
        'new certificate',
        'My name is [[name]]',
        currentDate,
        new Date(
          currentDate.getFullYear(),
          currentDate.getMonth() - 1,
          currentDate.getDate(),
        ),
        4,
      ),
    ).toThrow("End date can't be after the initial date.");
  });
});

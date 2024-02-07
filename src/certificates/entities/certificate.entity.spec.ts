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

  it.each([-1, 0])(
    'should not be able to create a certificate with a invalid hour number',
    (value) => {
      expect(() =>
        Certificate.create('title', 'content', new Date(), undefined, value),
      ).toThrow('Hours cannot be less than 1.');
    },
  );

  it('should not be able to set the initial date of a certificate with a date after the end date', () => {
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

    expect(() =>
      certificate.setInitialDate(
        new Date(
          currentDate.getFullYear(),
          currentDate.getMonth() + 2,
          currentDate.getDate(),
        ),
      ),
    ).toThrow();
  });

  it('should not be able to set the end date of a certificate with a date before the initial date', () => {
    const currentDate = new Date();

    const certificate = Certificate.create(
      'new certificate',
      'content',
      new Date(),
      undefined,
      4,
    );

    expect(() =>
      certificate.setEndDate(
        new Date(
          currentDate.getFullYear(),
          currentDate.getMonth() - 1,
          currentDate.getDate(),
        ),
      ),
    ).toThrow();
  });
});

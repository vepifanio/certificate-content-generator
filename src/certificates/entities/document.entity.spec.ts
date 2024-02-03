import { Document } from './document.entity';

describe('Document', () => {
  it('should be able to create a document with sanitized identifier', () => {
    const document = new Document('612.659.213-18');
    expect(document.getIdentifier()).toBe('61265921318');
  });

  it('should not be able to create a document whit less than 11 numeric digits', () => {
    expect(() => new Document('1111111111')).toThrow();
  });

  it('should not be able to create a document with not but only numeric digits', () => {
    expect(() => new Document('1111111111a')).toThrow();
  });
});

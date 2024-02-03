export class Document {
  private identifier: string;

  constructor(value: string) {
    const sanitizedValue = this.sanitizeIdentifier(value);
    if (!this.isValidDocumentIdentifier(sanitizedValue)) {
      throw new Error('Invalid document identifier.');
    }
    this.identifier = sanitizedValue;
  }

  getIdentifier() {
    return this.identifier;
  }

  private sanitizeIdentifier(value: string) {
    const sanitizedValue = value.replace(/(\.|-| )/g, '');
    return sanitizedValue;
  }

  private isValidDocumentIdentifier(value: string) {
    if (!value.match(/^[\d]{11}$/)) {
      return false;
    }

    return true;
  }
}

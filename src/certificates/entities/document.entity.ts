export class Document {
  private _identifier: string;

  constructor(value: string) {
    const sanitizedValue = this.sanitizeIdentifier(value);
    if (!this.isValidDocumentIdentifier(sanitizedValue)) {
      throw new Error('Invalid document identifier.');
    }
    this._identifier = sanitizedValue;
  }

  get identifier() {
    return this._identifier;
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

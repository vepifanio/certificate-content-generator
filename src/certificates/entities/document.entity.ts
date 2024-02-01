export class Document {
  private _identifier: string;

  constructor(value: string) {
    this._identifier = this.sanitizeIdentifier(value);
    this.checkValidDocumentIdentifier();
  }

  get identifier() {
    return this._identifier;
  }

  private sanitizeIdentifier(value: string) {
    const sanitizedValue = value.replace(/(\.|-| )/g, '');
    return sanitizedValue;
  }

  private checkValidDocumentIdentifier() {
    if (!this._identifier.match(/^[\d]{11}$/)) {
      throw new Error('A Document identifier must have 11 numeric digits.');
    }
  }
}

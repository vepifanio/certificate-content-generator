export class FindCertificatesByDocumentDto {
  constructor(
    readonly document: string,
    readonly page?: number,
  ) {}
}

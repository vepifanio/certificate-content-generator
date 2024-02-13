export class GenerateCertificateContentDto {
  constructor(
    readonly document: string,
    readonly variables?: { [key: string]: string },
  ) {}
}

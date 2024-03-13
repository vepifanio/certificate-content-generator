export class GeneratePdfDto {
  constructor(
    readonly certId: string,
    readonly text: string,
  ) {}
}

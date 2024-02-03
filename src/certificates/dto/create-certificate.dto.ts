export class CreateCertificateDto {
  readonly title: string;
  readonly content: string;
  readonly initialDate: Date;
  readonly endDate?: Date;
  readonly hours: number;

  constructor({
    title,
    content,
    hours,
    initialDate,
    endDate,
  }: CreateCertificateDto) {
    this.title = title;
    this.content = content;
    this.initialDate = initialDate;
    this.endDate = endDate;
    this.hours = hours;
  }
}

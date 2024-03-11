import { Controller, Get, Query } from '@nestjs/common';
import { FindCertificatesByDocumentDto } from 'src/certificates/dto/find-certificates-by-document';
import { FindCertificatesByDocumentService } from 'src/certificates/services/find-certificates-by-document.service';

@Controller('students')
export class StudentsController {
  constructor(
    private findCertificatesByDocument: FindCertificatesByDocumentService,
  ) {}

  @Get('certificates')
  async fetchByDocument(@Query() query: FindCertificatesByDocumentDto) {
    const { document, page } = query;

    return this.findCertificatesByDocument.execute({
      document,
      page,
    });
  }
}

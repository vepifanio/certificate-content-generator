import { Controller, Get, Query, Res } from '@nestjs/common';
import { GeneratePdfDto } from './dto/generate-pdf-dto';
import { Response } from 'express';
import * as PDFDocument from 'pdfkit';

@Controller('pdfs')
export class PdfsController {
  @Get('generate')
  async generate(
    @Res() res: Response,
    @Query() generatePdfDto: GeneratePdfDto,
  ) {
    try {
      const doc = new PDFDocument({
        size: 'A4',
        layout: 'landscape',
        bufferPages: true,
      });
      const stream = res.writeHead(200, {
        'Content-Type': 'application/pdf',
        'Content-disposition': `attachment;filename=${generatePdfDto.certId}.pdf`,
      });

      doc.on('data', (chunk) => stream.write(chunk));
      doc.on('end', () => stream.end());

      doc.image('src/assets/baseImg.jpeg', 0, 0, {
        width: doc.page.width,
        height: doc.page.height,
      });

      doc.text(generatePdfDto.text, 0, doc.page.height / 2, {
        align: 'center',
      });

      doc.end();
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: 'Something went wrong.' });
    }
  }
}

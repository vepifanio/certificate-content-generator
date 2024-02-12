import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { CertificatesService } from './certificates.service';
import { CreateCertificateDto } from './dto/create-certificate.dto';
import { UpdateCertificateDto } from './dto/update-certificate.dto';
import { SetDocumentsToCertificateDto } from './dto/set-documents-to-certificate-dto';

@Controller('certificates')
export class CertificatesController {
  constructor(private readonly certificatesService: CertificatesService) {}

  @Post()
  create(@Body() createCertificateDto: CreateCertificateDto) {
    return this.certificatesService.create(createCertificateDto);
  }

  @Post(':id/documents')
  setDocuments(
    @Param('id') id: string,
    @Body() setDocumentsToCertificateDto: SetDocumentsToCertificateDto,
  ) {
    return this.certificatesService.setDocuments(
      id,
      setDocumentsToCertificateDto,
    );
  }

  @Get()
  async findAll() {
    const certificates = await this.certificatesService.findAll();
    return {
      certificates,
    };
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.certificatesService.findOne(id);
  }

  @Get(':id/generate')
  async generateOne(
    @Param('id') id: string,
    @Query() query: { document: string; [key: string]: string },
  ) {
    const generatedCertificateContent = await this.certificatesService.generate(
      id,
      query,
    );

    return {
      content: generatedCertificateContent,
    };
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCertificateDto: UpdateCertificateDto,
  ) {
    return this.certificatesService.update(id, updateCertificateDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const deleted = await this.certificatesService.remove(id);
    return {
      deleted,
    };
  }
}

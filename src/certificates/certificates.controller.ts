import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CreateCertificateDto } from './dto/create-certificate.dto';
import { UpdateCertificateDto } from './dto/update-certificate.dto';
import { SetDocumentsToCertificateDto } from './dto/set-documents-to-certificate-dto';
import { CreateCertificateService } from './services/create-certificate.service';
import { SetCertificateDocumentsService } from './services/set-certificate-documents.service';
import { FindOneCertificateService } from './services/find-one-certificate.service';
import { FindAllCertificatesService } from './services/find-all-certificates.service';
import { UpdateCertificateService } from './services/update-certificate.service';
import { RemoveCertificateService } from './services/remove-certificate.service';
import { GenerateCertificateContentService } from './services/generate-certificate-content.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { FindAllCertificatesDto } from './dto/find-all-certificates.dto';

@Controller('certificates')
export class CertificatesController {
  constructor(
    private readonly createCertificateService: CreateCertificateService,
    private readonly setCertificatesDocumentsService: SetCertificateDocumentsService,
    private readonly findOneCertificateService: FindOneCertificateService,
    private readonly findAllCertificatesService: FindAllCertificatesService,
    private readonly updateCertificateService: UpdateCertificateService,
    private readonly removeCertificateService: RemoveCertificateService,
    private readonly generateCertificateContentService: GenerateCertificateContentService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createCertificateDto: CreateCertificateDto) {
    return this.createCertificateService.execute(createCertificateDto);
  }

  @UseGuards(JwtAuthGuard)
  @Post(':id/documents')
  setDocuments(
    @Param('id') id: string,
    @Body() setDocumentsToCertificateDto: SetDocumentsToCertificateDto,
  ) {
    return this.setCertificatesDocumentsService.execute(
      id,
      setDocumentsToCertificateDto,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(@Query() findAllCertificatesDto: FindAllCertificatesDto) {
    const certificates = await this.findAllCertificatesService.execute(
      findAllCertificatesDto,
    );
    return {
      certificates,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.findOneCertificateService.execute(id);
  }

  @Get(':id/generate')
  async generateOne(
    @Param('id') id: string,
    @Query() query: { document: string; [key: string]: string },
  ) {
    const generatedCertificateContent =
      await this.generateCertificateContentService.execute(id, query);

    return {
      content: generatedCertificateContent,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCertificateDto: UpdateCertificateDto,
  ) {
    return this.updateCertificateService.execute(id, updateCertificateDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    const deleted = await this.removeCertificateService.execute(id);
    return {
      deleted,
    };
  }
}

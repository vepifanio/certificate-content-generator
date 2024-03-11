import { Module } from '@nestjs/common';
import { CertificatesModule } from 'src/certificates/certificates.module';
import { StudentsController } from './students.controller';

@Module({
  imports: [CertificatesModule],
  controllers: [StudentsController],
})
export class StudentsModule {}

import { Module } from '@nestjs/common';
import { CertificatesModule } from './certificates/certificates.module';

@Module({
  imports: [CertificatesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}

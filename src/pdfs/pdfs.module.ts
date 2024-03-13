import { Module } from '@nestjs/common';
import { PdfsController } from './pdfs.controller';

@Module({
  controllers: [PdfsController],
})
export class PdfsModule {}

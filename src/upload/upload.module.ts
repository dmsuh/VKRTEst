import { Module } from '@nestjs/common';
import { UploadService } from './upload.service';
import { UploadController } from './upload.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Upload } from './entities/upload.entity';
import { UploadQueryRepository } from './repositories/upload-query.repository';
import { SpecificationFactory } from '../common/specifications/specification.factory';

@Module({
  imports: [TypeOrmModule.forFeature([Upload])],
  exports: [TypeOrmModule, UploadService, UploadQueryRepository],
  controllers: [UploadController],
  providers: [UploadService, UploadQueryRepository, SpecificationFactory],
})
export class UploadModule {}

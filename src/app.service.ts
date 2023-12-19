import {
  HttpException,
  HttpStatus,
  Injectable,
  StreamableFile,
} from '@nestjs/common';
import { UniqueEntityDto } from './common/dto/unique-entity.dto';
import { DataSource } from 'typeorm';
import { User } from './user/entities/user.entity';
import { UploadService } from './upload/upload.service';
import { EUploadType } from './upload/entities/upload.entity';
import * as path from 'path';
import * as fs from 'fs';
import { ConfigService } from '@nestjs/config';
import { UploadNotFoundException } from './upload/exceptions/upload-not-found.exception';
import { Response } from 'express';

@Injectable()
export class AppService {
  constructor(
    private readonly uploadService: UploadService,
    private readonly dataSource: DataSource,
    private readonly configService: ConfigService,
  ) {}

  getHello(): string {
    return 'Hello World!';
  }

  async uniqueEntity(entityType: string, dto: UniqueEntityDto) {
    const allowEntities = {
      user: {
        entityClass: User,
        fields: ['username', 'email'],
      },
    };

    const res = allowEntities[entityType];
    if (!res) {
      throw new HttpException(
        `The entity type '${entityType}' not allowed`,
        HttpStatus.BAD_REQUEST,
      );
    }

    if (!res.fields.indices(dto.field)) {
      throw new HttpException(
        `The '${dto.field}' field in '${entityType}' not allowed`,
        HttpStatus.BAD_REQUEST,
      );
    }

    const entity = await this.dataSource
      .getRepository(res.entityClass)
      .findOne({
        [dto.field]: dto.value,
      });

    if (!dto.primaryField || !dto.id) {
      return {
        exists: !!entity,
      };
    }

    return {
      exists: entity && entity[dto.primaryField] !== dto.id,
    };
  }

  async getFiles(filename: string) {
    const upload = await this.uploadService.findByFilename(filename);
    const filesStorage = this.configService.get<string>('filesStorage');
    const fullFilename = path.join(filesStorage, upload.filename);

    if (upload.uploadType === EUploadType.file) {
      if (fs.existsSync(fullFilename)) {
        return new StreamableFile(fs.createReadStream(fullFilename));
      }
    }

    throw new UploadNotFoundException();
  }
}

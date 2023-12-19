import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CreateUploadDto } from './dto/create-upload.dto';
import { UpdateUploadDto } from './dto/update-upload.dto';
import { UploadQueryRepository } from './repositories/upload-query.repository';
import { EntityDeleteDto } from '../common/dto/entity-delete.dto';
import { DataSource } from 'typeorm';
import { QueryFilterUploadDto } from './dto/query-filter-upload.dto';
import { EUploadType, Upload } from './entities/upload.entity';
import { randomUUID } from 'crypto';
import * as path from 'path';
import * as fs from 'fs';
import { UploadNotFoundException } from './exceptions/upload-not-found.exception';
import { FileNotAttachedException } from './exceptions/file-not-attached.exception';
import { UploadUploadDto } from './dto/upload-upload.dto';

@Injectable()
export class UploadService {
  constructor(
    private readonly uploadQueryRepository: UploadQueryRepository,
    private readonly dataSource: DataSource,
    private readonly configService: ConfigService,
  ) {}

  findAll(dto: QueryFilterUploadDto) {
    return this.uploadQueryRepository.getBaseQuery(dto).getMany();
  }

  async findOne(id: number) {
    const upload = await this.uploadQueryRepository.findOne(id);
    if (!upload) {
      throw new UploadNotFoundException();
    }
    return upload;
  }

  async findByFilename(filename: string) {
    const upload = await this.uploadQueryRepository.findByFilename(filename);
    if (!upload) {
      throw new UploadNotFoundException();
    }
    return upload;
  }

  async paginate(dto: QueryFilterUploadDto) {
    const query = this.uploadQueryRepository.getBaseQuery(dto);

    return {
      total: await query.getCount(),
      data: await query.getMany(),
    };
  }

  upload(dto: UploadUploadDto, file: Express.Multer.File) {
    if (!file) {
      throw new FileNotAttachedException();
    }

    return this.dataSource.transaction(async (manager) => {
      const parent = dto.parentId ? await this.findOne(dto.parentId) : null;

      const upload = new Upload();

      upload.parentId = parent?.id || null;

      const filesStorage = this.configService.get<string>('filesStorage');
      const ext = path.extname(file.originalname);
      const filename = randomUUID() + ext;

      upload.name = file.originalname;
      upload.mimeType = file.mimetype;
      upload.size = file.size;
      upload.filename = filename;
      upload.uploadType = EUploadType.file;

      fs.writeFileSync(path.join(filesStorage, filename), file.buffer);

      return manager.save(upload);
    });
  }

  create(dto: CreateUploadDto) {
    return this.dataSource.transaction(async (manager) => {
      const parent = dto.parentId ? await this.findOne(dto.parentId) : null;

      const upload = new Upload();
      upload.parentId = parent?.id || null;
      upload.name = dto.name;
      upload.uploadType = EUploadType.folder;

      return manager.save(upload);
    });
  }

  update(id: number, dto: UpdateUploadDto) {
    return this.dataSource.transaction(async (manager) => {
      const parent = dto.parentId ? await this.findOne(dto.parentId) : null;

      const upload = await this.findOne(id);
      upload.parentId = parent?.id || null;
      upload.name = dto.name;

      return manager.save(upload);
    });
  }

  remove(dto: EntityDeleteDto) {
    return this.dataSource.transaction(async (manager) => {
      for (const id of dto.ids) {
        const entity = await this.uploadQueryRepository.findOne(id);
        if (entity) {
          await manager.remove(entity);
        }
      }

      return true;
    });
  }
}

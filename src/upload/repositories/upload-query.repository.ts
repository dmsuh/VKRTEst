import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Upload } from '../entities/upload.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { SpecificationFactory } from '../../common/specifications/specification.factory';
import { QueryFilterUploadDto } from '../dto/query-filter-upload.dto';

@Injectable()
export class UploadQueryRepository {
  constructor(
    @InjectRepository(Upload)
    private readonly uploadRepository: Repository<Upload>,
    private readonly specificationFactory: SpecificationFactory<Upload>,
  ) {}

  getBaseQuery(dto: QueryFilterUploadDto) {
    const query = this.uploadRepository.createQueryBuilder();

    this.specificationFactory.build(dto, query, [
      { column: 'id', operator: 'equals' },
      { column: 'parentId', operator: 'equals' },
      { column: 'name', operator: 'like' },
    ]);

    return query;
  }

  findOne(id: number) {
    return this.uploadRepository
      .createQueryBuilder()
      .where('id = :id', { id })
      .getOne();
  }

  findByFilename(filename: string) {
    return this.uploadRepository
      .createQueryBuilder()
      .where('filename = :filename', { filename })
      .getOne();
  }
}

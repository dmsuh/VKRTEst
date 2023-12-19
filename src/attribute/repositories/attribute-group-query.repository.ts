import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { AttributeGroup } from '../entities/attribute-group.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { SpecificationFactory } from '../../common/specifications/specification.factory';
import { QueryFilterAttributeGroupDto } from '../dto/query-filter-attribute-group.dto';

@Injectable()
export class AttributeGroupQueryRepository {
  constructor(
    @InjectRepository(AttributeGroup)
    private readonly attributeGroupRepository: Repository<AttributeGroup>,
    private readonly specificationFactory: SpecificationFactory<AttributeGroup>,
  ) {}

  getBaseQuery(dto: QueryFilterAttributeGroupDto) {
    const query = this.attributeGroupRepository.createQueryBuilder();

    this.specificationFactory.build(dto, query, [
      { column: 'id', operator: 'equals' },
      { column: 'sortOrder', operator: 'equals' },
      { column: 'name', operator: 'like' },
    ]);

    return query;
  }

  findOne(id: number) {
    return this.attributeGroupRepository
      .createQueryBuilder('ag')
      .leftJoinAndSelect('ag.attributes', 'a')
      .where('ag.id = :id', { id })
      .getOne();
  }
}

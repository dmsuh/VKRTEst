import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Attribute } from '../entities/attribute.entity';
import { SpecificationFactory } from '../../common/specifications/specification.factory';
import { QueryFilterAttributeDto } from '../dto/query-filter-attribute.dto';
import { AttributeGroup } from '../entities/attribute-group.entity';

@Injectable()
export class AttributeQueryRepository {
  constructor(
    @InjectRepository(Attribute)
    private readonly attributeRepository: Repository<Attribute>,
    @InjectRepository(AttributeGroup)
    private readonly attributeGroupRepository: Repository<AttributeGroup>,
    private readonly specificationFactory: SpecificationFactory<Attribute>,
  ) {}

  findGrouped() {
    return this.attributeGroupRepository
      .createQueryBuilder('ag')
      .leftJoinAndSelect('ag.attributes', 'a')
      .getMany();
  }

  getBaseQuery(dto: QueryFilterAttributeDto) {
    const query = this.attributeRepository.createQueryBuilder();

    this.specificationFactory.build(dto, query, [
      { column: 'id', operator: 'equals' },
      { column: 'sortOrder', operator: 'equals' },
      { column: 'attributeGroupId', operator: 'equals' },
      { column: 'name', operator: 'like' },
    ]);

    return query;
  }

  findOne(id: number) {
    return this.attributeRepository
      .createQueryBuilder()
      .where('id = :id', { id })
      .getOne();
  }
}

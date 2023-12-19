import { Injectable } from '@nestjs/common';
import { AttributeQueryRepository } from '../repositories/attribute-query.repository';
import { AttributeNotFoundException } from '../exceptions/attribute-not-found.exception';
import { QueryFilterAttributeDto } from '../dto/query-filter-attribute.dto';

@Injectable()
export class AttributeService {
  constructor(
    private readonly attributeQueryRepository: AttributeQueryRepository,
  ) {}

  findAll(dto: QueryFilterAttributeDto) {
    return this.attributeQueryRepository.getBaseQuery(dto).getMany();
  }

  async findGrouped() {
    const result = await this.attributeQueryRepository.findGrouped();

    return result.map((entity) => ({
      id: entity.id,
      name: entity.name,
      type: 'attribute_group',
      isLeaf: true,
      children: entity.attributes.map((entityAttribute) => ({
        id: entityAttribute.id,
        name: entityAttribute.name,
        type: 'attribute',
        isLeaf: false,
      })),
    }));
  }

  async findOne(id: number) {
    const attributeGroup = await this.attributeQueryRepository.findOne(id);

    if (!attributeGroup) {
      throw new AttributeNotFoundException();
    }

    return attributeGroup;
  }

  async paginate(dto: QueryFilterAttributeDto) {
    const query = this.attributeQueryRepository.getBaseQuery(dto);

    return {
      total: await query.getCount(),
      data: await query.getMany(),
    };
  }
}

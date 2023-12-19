import { Injectable } from '@nestjs/common';
import { QueryFilterAttributeGroupDto } from '../dto/query-filter-attribute-group.dto';
import { DataSource } from 'typeorm';
import { AttributeGroupQueryRepository } from '../repositories/attribute-group-query.repository';
import { AttributeGroupNotFoundException } from '../exceptions/attribute-group-not-found.exception';
import { AttributeGroup } from '../entities/attribute-group.entity';
import { CreateAttributeGroupDto } from '../dto/create-attribute-group.dto';
import { Attribute } from '../entities/attribute.entity';
import { InvalidUpdateParameterException } from '../../common/exceptions/invalid-update-parameter.exception';
import { UpdateAttributeGroupDto } from '../dto/update-attribute-group.dto';
import { EntityDeleteDto } from '../../common/dto/entity-delete.dto';

@Injectable()
export class AttributeGroupService {
  constructor(
    private readonly attributeGroupQueryRepository: AttributeGroupQueryRepository,
    private readonly dataSource: DataSource,
  ) {}

  findAll(dto: QueryFilterAttributeGroupDto) {
    return this.attributeGroupQueryRepository.getBaseQuery(dto).getMany();
  }

  async findOne(id: number) {
    const attributeGroup = await this.attributeGroupQueryRepository.findOne(id);

    if (!attributeGroup) {
      throw new AttributeGroupNotFoundException();
    }

    return attributeGroup;
  }

  async paginate(dto: QueryFilterAttributeGroupDto) {
    const query = this.attributeGroupQueryRepository.getBaseQuery(dto);

    return {
      total: await query.getCount(),
      data: await query.getMany(),
    };
  }

  create(dto: CreateAttributeGroupDto) {
    return this.dataSource.transaction(async (manager) => {
      const attributeGroup = new AttributeGroup();
      attributeGroup.sortOrder = dto.sortOrder;
      attributeGroup.name = dto.name;

      attributeGroup.attributes = [];
      for (const attributeDto of dto.attributes) {
        const attribute = new Attribute();

        attribute.sortOrder = attributeDto.sortOrder;
        attribute.name = attributeDto.name;

        attributeGroup.attributes.push(attribute);
      }

      return manager.save(attributeGroup);
    });
  }

  update(id: number, dto: UpdateAttributeGroupDto) {
    if (id !== dto.id) {
      throw new InvalidUpdateParameterException();
    }

    return this.dataSource.transaction(async (manager) => {
      const attributeGroup = await this.findOne(id);

      attributeGroup.sortOrder = dto.sortOrder;
      attributeGroup.name = dto.name;

      // Обновляем существующие фильтры для группы
      attributeGroup.attributes.forEach((attribute, index) => {
        const attributeDto = dto
          .getUpdateAttributes()
          .find((f) => f.id === attribute.id);

        if (!attributeDto) {
          attributeGroup.attributes.splice(index, 1);

          return;
        }

        attribute.sortOrder = attributeDto.sortOrder;
        attribute.name = attributeDto.name;
      });

      // Добавляем новые фильтры для группы
      dto.getCreateAttributes().forEach((attributeDto) => {
        const attribute = new Attribute();

        attribute.sortOrder = attributeDto.sortOrder;
        attribute.name = attributeDto.name;

        attributeGroup.attributes.push(attribute);
      });

      return manager.save(attributeGroup);
    });
  }

  remove(dto: EntityDeleteDto) {
    return this.dataSource.transaction(async (manager) => {
      for (const id of dto.ids) {
        const entity = await this.attributeGroupQueryRepository.findOne(id);
        if (entity) {
          await manager.remove(entity);
        }
      }

      return true;
    });
  }
}

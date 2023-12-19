import { EqualsSpecification } from './equals.specification';
import { OrderSpecification } from './order.specification';
import { SpecificationInterface } from './specification.interface';
import { SelectQueryBuilder } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { LikeSpecification } from './like.specification';
import { NotLikeSpecification } from './not-like.specification';
import { FieldsSpecification } from './fields.specification';
import { LimitSpecification } from './limit.specification';
import { OffsetSpecification } from './offset.specification';
import { IsNullSpecification } from './is-null.specification';

export interface MappedColumnInterface {
  column: string;
  alias?: string | null;
  type?: 'date';
  operator: 'equals' | 'like' | 'notLike';
}

@Injectable()
export class SpecificationFactory<Entity> {
  build(
    dto: any,
    queryBuilder: SelectQueryBuilder<Entity>,
    mappedColumns: MappedColumnInterface[],
  ): SelectQueryBuilder<Entity> {
    const keys = Object.keys(dto);
    const specifications: SpecificationInterface<Entity>[] = [];

    if (keys.includes('fields')) {
      specifications.push(new FieldsSpecification(dto.fields, mappedColumns));

      keys.splice(keys.indexOf('fields'), 1);
    }

    if (keys.includes('order')) {
      specifications.push(new OrderSpecification(dto.order, mappedColumns));

      keys.splice(keys.indexOf('order'), 1);
    }

    if (keys.includes('isNull')) {
      specifications.push(new IsNullSpecification(dto.isNull, mappedColumns));

      keys.splice(keys.indexOf('isNull'), 1);
    }

    if (keys.includes('limit')) {
      specifications.push(new LimitSpecification(dto.limit));

      keys.splice(keys.indexOf('limit'), 1);
    }

    if (keys.includes('offset')) {
      specifications.push(new OffsetSpecification(dto.offset));

      keys.splice(keys.indexOf('offset'), 1);
    }

    const operatorSpecs = {
      equals: EqualsSpecification,
      like: LikeSpecification,
      notLike: NotLikeSpecification,
    };

    for (const key of keys) {
      const mapped = mappedColumns.find((mc) => mc.column === key);
      const column = key;
      if (!mapped) {
        specifications.push(new EqualsSpecification(column, dto[key]));
        continue;
      }

      specifications.push(
        new operatorSpecs[mapped.operator](
          column,
          dto[key],
          mapped?.alias || null,
          mapped?.type || null,
        ),
      );
    }

    for (const specification of specifications) {
      specification.match(queryBuilder);
    }

    console.log(queryBuilder.getSql());

    return queryBuilder;
  }
}

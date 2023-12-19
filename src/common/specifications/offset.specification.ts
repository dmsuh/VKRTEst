import { SelectQueryBuilder } from 'typeorm/query-builder/SelectQueryBuilder';
import { SpecificationInterface } from './specification.interface';

export class OffsetSpecification<T> implements SpecificationInterface<T> {
  public type = 'offset';

  constructor(private offset: number) {}

  match(queryBuilder: SelectQueryBuilder<T>) {
    if (this.offset) {
      queryBuilder.offset(this.offset);
    }

    return queryBuilder;
  }
}

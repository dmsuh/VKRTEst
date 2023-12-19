import { SelectQueryBuilder } from 'typeorm/query-builder/SelectQueryBuilder';
import { SpecificationInterface } from './specification.interface';

export class LimitSpecification<T> implements SpecificationInterface<T> {
  public type = 'limit';

  constructor(private limit: number) {}

  match(queryBuilder: SelectQueryBuilder<T>) {
    if (this.limit) {
      queryBuilder.limit(this.limit);
    }

    return queryBuilder;
  }
}

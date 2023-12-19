import { SelectQueryBuilder } from 'typeorm';

export interface SpecificationInterface<T> {
  type: string;

  match(queryBuilder: SelectQueryBuilder<T>): SelectQueryBuilder<T>;
}

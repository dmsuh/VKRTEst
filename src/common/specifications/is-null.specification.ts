import { SpecificationInterface } from './specification.interface';
import { SelectQueryBuilder } from 'typeorm';
import { MappedColumnInterface } from './specification.factory';

export class IsNullSpecification<T> implements SpecificationInterface<T> {
  public type = 'isNull';

  constructor(
    private column: string,
    private mappedColumns: MappedColumnInterface[],
  ) {}

  match(queryBuilder: SelectQueryBuilder<T>) {
    const alias =
      this.mappedColumns.find((mc) => mc.column === this.column)?.alias ||
      queryBuilder.alias;

    return queryBuilder.andWhere(`${alias}.${this.column} IS NULL`);
  }
}

import { SpecificationInterface } from './specification.interface';
import { SelectQueryBuilder } from 'typeorm';

export class EqualsSpecification<T> implements SpecificationInterface<T> {
  public type = 'operator';

  constructor(
    private columnName: string,
    private value: any | any[],
    private alias: string | null = null,
    private columnType: 'date' | null = null,
  ) {}

  match(queryBuilder: SelectQueryBuilder<T>) {
    if (!this.alias) {
      this.alias = queryBuilder.alias;
    }

    if (this.columnName && this.value) {
      const column = this.alias
        ? `${this.alias}.${this.columnName}`
        : this.columnName;

      if (this.columnType === 'date') {
        queryBuilder.andWhere(`DATE(${column}) = DATE(:${this.columnName})`, {
          [this.columnName]: this.value,
        });
      } else {
        queryBuilder.andWhere(`${column} = :${this.columnName}`, {
          [this.columnName]: this.value,
        });
      }
    }

    return queryBuilder;
  }
}

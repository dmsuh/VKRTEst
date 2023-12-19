import { SpecificationInterface } from './specification.interface';
import { SelectQueryBuilder } from 'typeorm';

export class LikeSpecification<T> implements SpecificationInterface<T> {
  public type = 'operator';

  constructor(
    private columnName: string,
    private value: string,
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

      queryBuilder.andWhere(`${column} LIKE :${this.columnName}`, {
        [this.columnName]: `%${this.value}%`,
      });
    }

    return queryBuilder;
  }
}

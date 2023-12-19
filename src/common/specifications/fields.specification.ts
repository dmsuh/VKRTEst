import { SpecificationInterface } from './specification.interface';
import { SelectQueryBuilder } from 'typeorm';
import { MappedColumnInterface } from './specification.factory';

export class FieldsSpecification<T> implements SpecificationInterface<T> {
  public type = 'fields';

  constructor(
    private columns: string | string[],
    private mappedColumns: MappedColumnInterface[],
  ) {}

  match(queryBuilder: SelectQueryBuilder<T>) {
    if (typeof this.columns === 'string') {
      this.columns = this.columns.trim().split(',');
    }

    if (!Array.isArray(this.columns)) {
      return queryBuilder;
    }

    this.columns = this.columns.filter((column) =>
      this.mappedColumns.some((mc) => mc.column === column),
    );

    if (this.columns.length < 0) {
      return queryBuilder;
    }

    this.columns = this.columns.map((column) => {
      const alias =
        this.mappedColumns.find((mc) => mc.column === column)?.alias ||
        queryBuilder.alias;

      return alias + '.' + column;
    });

    return queryBuilder.select(this.columns);
  }
}

import { SpecificationInterface } from './specification.interface';
import { SelectQueryBuilder } from 'typeorm';
import { MappedColumnInterface } from './specification.factory';

export type OrderType = 'DESC' | 'ASC';

export class OrderSpecification<T> implements SpecificationInterface<T> {
  public type = 'order';

  constructor(
    private order: string | string[],
    private mappedColumns: MappedColumnInterface[],
  ) {}

  match(queryBuilder: SelectQueryBuilder<T>) {
    if (typeof this.order === 'string') {
      this.order = this.order.trim().split(',');
    }

    const ormOrder: [string, OrderType][] = this.order.map((order) => {
      const [orderColumn, orderType = 'ASC'] = order.split(':');
      let alias = queryBuilder.alias;

      const mapped = this.mappedColumns.find((mc) => mc.column === orderColumn);
      if (mapped && !!mapped.alias) {
        alias = mapped.alias;
      }

      return [`${alias}.${orderColumn}`, orderType.toUpperCase() as OrderType];
    });

    ormOrder.forEach((order) => {
      const [orderColumn, orderType] = order;

      if (this.validOrderType(orderType)) {
        queryBuilder.addOrderBy(orderColumn, orderType);
      }
    });

    return queryBuilder;
  }

  validOrderType(type: string): boolean {
    const allowTypes = ['DESC', 'ASC'];

    return allowTypes.includes(type.toUpperCase());
  }
}

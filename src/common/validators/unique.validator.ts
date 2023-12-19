import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

@Injectable()
@ValidatorConstraint({ name: 'UniqueValidator', async: true })
export class UniqueValidator implements ValidatorConstraintInterface {
  constructor(private readonly dataSource: DataSource) {}

  async validate(value: any, args: ValidationArguments): Promise<boolean> {
    const [entityClass, uniqueField = args.property, exceptField = null] =
      args.constraints;

    if (!value || !entityClass) return false;

    const query = this.dataSource
      .getRepository(entityClass)
      .createQueryBuilder();

    const entity = await query
      .select([
        query.alias + '.' + (exceptField || 'id'),
        query.alias + '.' + uniqueField,
      ])
      .where(`${uniqueField} = :${uniqueField}`, {
        [uniqueField]: value,
      })
      .getOne();

    if (!entity) {
      return true;
    }

    // Проверка, если происходит обновление сущности, то ей же уникальный индекс и пренадлежит
    // Если поле не будет указано, то пропустим проверку
    if (exceptField) {
      const exceptFieldValue = (args.object as any)[exceptField];
      if (!exceptFieldValue) {
        return false;
      }

      return entity[exceptField] === exceptFieldValue;
    }

    return false;
  }

  defaultMessage(args: ValidationArguments) {
    const [entityClass] = args.constraints;
    const entityName = entityClass.name || 'Entity';
    return `${entityName} with the same '${args.property}' already exist`;
  }
}

export function Unique(
  entityClass: any,
  uniqueField: string,
  exceptField: string = null,
  validationOptions?: ValidationOptions,
) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [entityClass, uniqueField, exceptField],
      validator: UniqueValidator,
    });
  };
}

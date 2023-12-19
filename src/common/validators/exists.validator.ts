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
@ValidatorConstraint({ name: 'ExistsValidator', async: true })
export class ExistsValidator implements ValidatorConstraintInterface {
  constructor(private readonly dataSource: DataSource) {}

  async validate(value: any, args: ValidationArguments): Promise<boolean> {
    const [entityClass, field] = args.constraints;

    if (value === null) return true;

    const entity = await this.dataSource.getRepository(entityClass).findOneBy({
      [field]: value,
    });

    return !!entity;
  }

  defaultMessage(args: ValidationArguments) {
    const [entityClass] = args.constraints;
    const entityName = entityClass.name || 'Entity';
    return `the "${entityName}" entity record does not exist`;
  }
}

export function Exists(
  entityClass: any,
  field = 'id',
  validationOptions?: ValidationOptions,
) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [entityClass, field],
      validator: ExistsValidator,
    });
  };
}

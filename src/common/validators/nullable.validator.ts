import {
  registerDecorator,
  ValidationOptions,
  ValidateIf,
} from 'class-validator';

export function IsNullable(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: function (validationOptions?: ValidationOptions) {
        return ValidateIf((object, value) => value !== null, validationOptions);
      },
    });
  };
}

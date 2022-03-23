import { Allow, registerDecorator, ValidationOptions } from 'class-validator';
import { BrandsNameValidator } from '../validators/brands-name.validator';

/**
 *
 */
export function BrandsNameCheck(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'BrandsNameCheck',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: BrandsNameValidator,
    });
  };
}

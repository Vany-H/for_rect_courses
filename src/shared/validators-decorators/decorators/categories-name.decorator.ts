import { Allow, registerDecorator, ValidationOptions } from 'class-validator';
import { CategoriesNameValidator } from '../validators/categories-name.validator';

/**
 *
 */
export function CategoriesNameCheck(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    Allow()(object, '');
    registerDecorator({
      name: 'CategoriesNameCheck',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: CategoriesNameValidator,
    });
  };
}

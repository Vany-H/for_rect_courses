import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { Categories } from 'src/entity/categories.entity';
import { Repository } from 'typeorm';

@ValidatorConstraint({ async: true })
@Injectable()
export class CategoriesNameValidator implements ValidatorConstraintInterface {
  @InjectRepository(Categories)
  private readonly categoriesRepo: Repository<Categories>;

  async validate(
    value: any,
    validationArguments?: ValidationArguments,
  ): Promise<boolean> {
    const categories = await this.categoriesRepo.findOne({
      where: { name: value },
    });

    if (!categories) throw new HttpException('This category not exist', 404);

    return true;
  }

  defaultMessage?(validationArguments?: ValidationArguments): string {
    throw new Error('Categories not exist');
  }
}

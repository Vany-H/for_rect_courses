import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { Brands } from 'src/entity/brands.entity';
import { Repository } from 'typeorm';

@ValidatorConstraint({ async: true })
@Injectable()
export class BrandsNameValidator implements ValidatorConstraintInterface {
  @InjectRepository(Brands)
  private readonly brandRepo: Repository<Brands>;

  async validate(
    value: any,
    validationArguments?: ValidationArguments,
  ): Promise<boolean> {
    const brands = await this.brandRepo.findOne({ where: { name: value } });

    if (!brands) throw new HttpException('This brand not exist', 404);

    return true;
  }

  defaultMessage?(validationArguments?: ValidationArguments): string {
    throw new Error('Brand not exist');
  }
}

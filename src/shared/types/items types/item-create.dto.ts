import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsString,
  MinLength,
} from 'class-validator';
import { ToInt } from 'src/shared/helper/number.transformer';

export class CreateItemDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  name: string;

  @IsNotEmpty()
  @ToInt()
  @IsNumber()
  grade: number;

  @IsNotEmpty()
  @ToInt()
  @IsNumber()
  price: number;

  @IsNotEmpty()
  @ToInt()
  @IsNumber()
  sale: number = 0;

  @ToInt()
  @IsNumber()
  parent?: number;

  titleImg?: string;

  imagesURLs?: string[];

  characteristics?: any;
}

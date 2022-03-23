import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsEnum, IsNumber, IsString } from 'class-validator';
import { ToInt } from 'src/shared/helper/number.transformer';
import { BrandsNameCheck } from 'src/shared/validators-decorators/decorators/brands-name.decorator';
import { CategoriesNameCheck } from 'src/shared/validators-decorators/decorators/categories-name.decorator';
import { SortByEnum } from '../sort.enum';

export enum SortFieldEnum {
  name = 'name',
  createAt = 'create_at',
  sale = 'sale',
  price = 'price',
  grade = 'grade',
}

export class GetItemsQueryDto {
  @IsString()
  @IsEnum(SortByEnum)
  @ApiProperty({ enum: SortByEnum, nullable: true, required: false })
  sortType?: SortByEnum = SortByEnum.ASC;

  @IsString()
  @IsEnum(SortFieldEnum)
  @ApiProperty({ enum: SortFieldEnum, nullable: true, required: false })
  sortBy?: SortFieldEnum;

  @IsString()
  @ApiProperty({ nullable: true, required: false })
  search?: string;

  @ToInt()
  @IsNumber()
  offset: number;

  @ToInt()
  @IsNumber()
  limit: number;
}

export class GetItemsParamDto {
  @IsString()
  @ApiProperty({ nullable: true, required: false })
  @CategoriesNameCheck()
  categories?: string;

  @IsString()
  @ApiProperty({ nullable: true, required: false })
  @BrandsNameCheck()
  brands?: string;
}

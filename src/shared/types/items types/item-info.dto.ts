import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNumber, IsString } from 'class-validator';
import { ToInt } from 'src/shared/helper/number.transformer';
import { ItemPageEnum } from './item-page.enum';

export class GetItemInfoParamDto {
  @ToInt()
  @IsNumber()
  @ApiProperty()
  item_id: number;

  @IsEnum(ItemPageEnum)
  @IsString()
  @ApiProperty({ enum: ItemPageEnum })
  page: ItemPageEnum;
}

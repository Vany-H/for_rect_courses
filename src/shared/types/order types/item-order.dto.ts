import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class ItemOrder {
  @IsNumber()
  @ApiProperty()
  itemsId: number;

  @IsNumber()
  @ApiProperty()
  quantity: number;
}

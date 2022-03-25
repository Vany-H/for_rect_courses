import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';
import { ToInt } from 'src/shared/helper/number.transformer';

export class GetCommentItemsParamDto {
  @ToInt()
  @IsNumber()
  itemId: number;

  @ToInt()
  @IsNumber()
  @ApiProperty({ nullable: true, required: false })
  offset: number;

  @ToInt()
  @IsNumber()
  @ApiProperty({ nullable: true, required: false })
  limit: number;
}

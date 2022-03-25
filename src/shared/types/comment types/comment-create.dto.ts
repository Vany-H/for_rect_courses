import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';
import { ToInt } from 'src/shared/helper/number.transformer';

export class CreateCommentDto {
  @IsNumber()
  @ApiProperty()
  itemId: number;

  @IsString()
  @ApiProperty()
  userName: string;

  @IsString()
  @ApiProperty()
  comment: string;

  @ToInt()
  @ApiProperty({ required: false, nullable: true })
  replyId: number;
}

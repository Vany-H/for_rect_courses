import { ApiProperty } from '@nestjs/swagger';
import { IsEmpty, IsString } from 'class-validator';

export class SearchQueryDto {
  @ApiProperty({ nullable: true, required: false })
  search?: string;
}

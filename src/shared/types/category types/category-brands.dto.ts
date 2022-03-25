import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class BrandsCategoryParamDto {
  @ApiProperty()
  idOrName: string;
}

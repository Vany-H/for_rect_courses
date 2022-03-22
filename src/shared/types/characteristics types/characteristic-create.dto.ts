import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsString } from 'class-validator';
import { TypesEnum } from '../type.enum';

export class CharacteristicsCreate {
  @IsString()
  code: string;

  @IsString()
  @IsEnum(TypesEnum)
  @ApiProperty({ enum: TypesEnum })
  type: TypesEnum;
}

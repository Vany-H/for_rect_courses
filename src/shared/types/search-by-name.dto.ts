import { IsEmpty, IsString } from 'class-validator';

export class SearchQueryDto {
  @IsString()
  @IsEmpty()
  search?: string;
}

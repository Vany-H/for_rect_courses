import { IsString } from 'class-validator';

export class CategoryCreate {
  @IsString()
  name: string;
}

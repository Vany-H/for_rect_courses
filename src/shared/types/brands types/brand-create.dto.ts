import { IsString } from 'class-validator';

export class BrandCreate {
  @IsString()
  name: string;
}

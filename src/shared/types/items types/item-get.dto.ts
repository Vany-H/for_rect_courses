import { SortByEnum } from 'aws-sdk/clients/codecommit';

export class GetItemsQueryDto {
  sortType: SortByEnum;
  sortBy: SortField;
  search: string;
  category: Array<string>;
}

export enum SortField {
  name = 'name',
  createAt = 'create_at',
  sale = 'sale',
  price = 'price',
  grade = 'grade',
}

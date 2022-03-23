import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { CategoryCreate } from 'src/shared/types/category types/category-create.dto';
import { SearchQueryDto } from 'src/shared/types/search-by-name.dto';
import { CategoriesService } from './categories.service';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  createCatagory(@Body() { name }: CategoryCreate) {
    return this.categoriesService.createCategory(name);
  }

  @Get('categories-list')
  listOfCategories(@Query() { search }: SearchQueryDto) {
    return this.categoriesService.getCategories(search);
  }
}

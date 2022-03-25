import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { ApiExcludeEndpoint, ApiTags } from '@nestjs/swagger';
import { BrandsCategoryParamDto } from 'src/shared/types/category types/category-brands.dto';
import { CategoryCreate } from 'src/shared/types/category types/category-create.dto';
import { SearchQueryDto } from 'src/shared/types/search-by-name.dto';
import { CategoriesService } from './categories.service';

@ApiTags('Categories')
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @ApiExcludeEndpoint(true)
  @Post()
  createCatagory(@Body() { name }: CategoryCreate) {
    return this.categoriesService.createCategory(name);
  }

  @Get('categories-list')
  listOfCategories(@Query() { search }: SearchQueryDto) {
    return this.categoriesService.getCategories(search);
  }

  @Get('brands-of-category/:idOrName')
  async brandsOfCategory(@Param() { idOrName }: BrandsCategoryParamDto) {
    return this.categoriesService.getBrandsOfCatagory(idOrName);
  }
}

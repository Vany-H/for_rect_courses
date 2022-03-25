import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ApiExcludeEndpoint, ApiTags } from '@nestjs/swagger';
import { Brands } from 'src/entity/brands.entity';
import { BrandCreate } from 'src/shared/types/brands types/brand-create.dto';
import { SearchQueryDto } from 'src/shared/types/search-by-name.dto';
import { BrandsService } from './brands.service';

@ApiTags('Brands')
@Controller('brands')
export class BrandsController {
  constructor(private readonly brandService: BrandsService) {}

  @ApiExcludeEndpoint(true)
  @Post()
  async createBrand(@Body() { name }: BrandCreate): Promise<Brands> {
    return this.brandService.createBrand(name);
  }

  @Get('/list-brand')
  async listOfBrands(@Query() { search }: SearchQueryDto) {
    return this.brandService.getBrands(search);
  }
}

import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import characteristics from 'src/db/seeds/characteristics';
import { CharacteristicsCreate } from 'src/shared/types/characteristics types/characteristic-create.dto';
import { SearchQueryDto } from 'src/shared/types/search-by-name.dto';
import { CharacteristicsService } from './characteristics.service';

@ApiTags('Characteristics')
@Controller('characteristics')
export class CharacteristicsController {
  constructor(private readonly characteristicService: CharacteristicsService) {}

  @Post()
  async createCharacteristics(@Body() { code, type }: CharacteristicsCreate) {
    return this.characteristicService.createCharactristic(code, type);
  }

  @Get('characteristics-list')
  async getCategories(@Query() { search }: SearchQueryDto) {
    return this.characteristicService.getAllCharacteristics(search);
  }
}

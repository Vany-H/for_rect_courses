import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import characteristics from 'src/db/seeds/characteristics';
import { CharacteristicsCreate } from 'src/shared/types/characteristics types/characteristic-create.dto';
import { CharacteristicsService } from './characteristics.service';

@ApiTags('Characteristics')
@Controller('characteristics')
export class CharacteristicsController {
  constructor(private readonly characteristicService: CharacteristicsService) {}

  @Post()
  async createCharacteristics(@Body() { code, type }: CharacteristicsCreate) {
    return this.characteristicService.createCharactristic(code, type);
  }
}

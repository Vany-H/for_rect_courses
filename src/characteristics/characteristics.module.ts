import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Characteristics } from 'src/entity/characteristics.entity';
import { CharacteristicsController } from './characteristics.controller';
import { CharacteristicsService } from './characteristics.service';

@Module({
  imports: [TypeOrmModule.forFeature([Characteristics])],
  providers: [CharacteristicsService],
  controllers: [CharacteristicsController],
  exports: [CharacteristicsService],
})
export class CharacteristicsModule {}

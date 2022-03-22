import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DbModule } from './db/db.module';
import { ItemsModule } from './items/items.module';
import { CharacteristicsModule } from './characteristics/characteristics.module';

@Module({
  imports: [ItemsModule, DbModule, CharacteristicsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

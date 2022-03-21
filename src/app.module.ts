import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DbModule } from './db/db.module';
import { ItemsModule } from './items/items.module';

@Module({
  imports: [ItemsModule, DbModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

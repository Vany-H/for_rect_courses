import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DbModule } from './db/db.module';
import { ItemsModule } from './items/items.module';
import { CharacteristicsModule } from './characteristics/characteristics.module';
import { BrandsModule } from './brands/brands.module';
import { CategoriesModule } from './categories/categories.module';
import { CategoriesNameValidator } from './shared/validators-decorators/validators/categories-name.validator';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Categories } from './entity/categories.entity';
import { BrandsNameValidator } from './shared/validators-decorators/validators/brands-name.validator';
import { Brands } from './entity/brands.entity';

@Module({
  imports: [
    ItemsModule,
    DbModule,
    CharacteristicsModule,
    BrandsModule,
    CategoriesModule,
    TypeOrmModule.forFeature([Categories, Brands]),
  ],
  controllers: [AppController],
  providers: [AppService, CategoriesNameValidator, BrandsNameValidator],
})
export class AppModule {}

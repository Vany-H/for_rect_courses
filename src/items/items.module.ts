import { Module } from '@nestjs/common';
import { ItemsService } from './items.service';
import { ItemsController } from './items.controller';
import { IpfsModule } from 'src/ipfs/ipfs.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Items } from 'src/entity/items.entity';
import { CharacteristicsModule } from 'src/characteristics/characteristics.module';
import { BrandsNameValidator } from 'src/shared/validators-decorators/validators/brands-name.validator';
import { CategoriesNameValidator } from 'src/shared/validators-decorators/validators/categories-name.validator';
import { Categories } from 'src/entity/categories.entity';
import { Brands } from 'src/entity/brands.entity';
import { CategoriesModule } from 'src/categories/categories.module';
import { BrandsModule } from 'src/brands/brands.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Items]),
    IpfsModule.forRoot({ baseURL: process.env.IPFS_URL, host: 5001 }),
    CharacteristicsModule,
    CategoriesModule,
    BrandsModule,
  ],
  providers: [ItemsService],
  controllers: [ItemsController],
})
export class ItemsModule {}

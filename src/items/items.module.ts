import { Module } from '@nestjs/common';
import { ItemsService } from './items.service';
import { ItemsController } from './items.controller';
import { IpfsModule } from 'src/ipfs/ipfs.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Items } from 'src/entity/items.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Items]),
    IpfsModule.forRoot({ baseURL: process.env.IPFS_URL, host: 5001 }),
  ],
  providers: [ItemsService],
  controllers: [ItemsController],
})
export class ItemsModule {}

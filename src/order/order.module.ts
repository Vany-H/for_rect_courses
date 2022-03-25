import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Orders } from 'src/entity/order.entity';
import { Items } from 'src/entity/items.entity';
import { OrdersItems } from 'src/entity/order-items.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Orders, Items, OrdersItems])],
  providers: [OrderService],
  controllers: [OrderController],
})
export class OrderModule {}

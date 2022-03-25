import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';
import { Items } from './items.entity';
import { Orders } from './order.entity';

@Entity()
export class OrdersItems {
  @PrimaryColumn({ name: 'orders_id' })
  ordersId: number;

  @PrimaryColumn({ name: 'items_id' })
  itemsId: number;

  @Column()
  quantity: number;

  @ManyToOne(() => Items, (items) => items.id)
  @JoinColumn({ name: 'items_id' })
  items: Items;

  @ManyToOne(() => Orders, (orders) => orders.id)
  @JoinColumn({ name: 'orders_id' })
  orders: Orders;
}

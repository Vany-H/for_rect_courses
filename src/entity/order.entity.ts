import { Timestamps } from 'src/shared/helper/timestamp.abstract';
import { PaymentTypeEnum } from 'src/shared/types/payment-type.enum';
import { ServiceEnum } from 'src/shared/types/service.enum';
import { Column, Entity, JoinTable, ManyToMany, PrimaryColumn } from 'typeorm';
import { Items } from './items.entity';

@Entity()
export class Orders extends Timestamps {
  @PrimaryColumn()
  id: number;

  @Column()
  total: number;

  @Column()
  city: string;

  @Column()
  street: string;

  @Column()
  house: string;

  @Column()
  flat: string;

  @Column({ enum: PaymentTypeEnum, name: 'payment_type' })
  paymentType: PaymentTypeEnum;

  @Column({ enum: ServiceEnum })
  service: ServiceEnum;

  @ManyToMany(() => Items, (item) => item.id)
  @JoinTable({
    name: 'orders_items',
    joinColumn: { name: 'orders_id', referencedColumnName: 'id' },
    inverseJoinColumn: {
      name: 'items_id',
      referencedColumnName: 'id',
    },
  })
  characteristics: Items[];
}

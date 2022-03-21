import { Timestamps } from 'src/shared/helper/timestamp.abstract';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { Characteristics } from './characteristics.entity';
import { Items } from './items.entity';

@Entity()
export class CharacteristicsItems {
  @PrimaryColumn()
  characteristics_id: number;

  @PrimaryColumn()
  items_id: number;

  @Column()
  value: string;

  @JoinColumn({ name: 'items_id' })
  @ManyToOne(() => Items, (items) => items.id)
  item: Items;

  @JoinColumn({ name: 'characteristics_id' })
  @ManyToOne(() => Characteristics, (characteristics) => characteristics.id)
  characteristics: Characteristics;
}

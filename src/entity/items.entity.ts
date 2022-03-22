import { Timestamps } from 'src/shared/helper/timestamp.abstract';
import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';

@Entity()
export class Items extends Timestamps {
  @PrimaryColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  title_img: string;

  @Column('text', { array: true })
  image_URL: string[];

  @Column()
  grade: number;

  @Column({ name: 'parent_id' })
  @ManyToOne(() => Items, (item) => item.id)
  parent: number;

  @Column()
  price: number;

  @Column()
  sale: number;
}

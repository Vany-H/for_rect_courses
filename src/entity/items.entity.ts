import { Timestamps } from 'src/shared/helper/timestamp.abstract';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';
import { Brands } from './brands.entity';
import { Categories } from './categories.entity';
import { Characteristics } from './characteristics.entity';

@Entity()
export class Items extends Timestamps {
  @PrimaryColumn()
  id: number;

  @Column()
  name: string;

  @Column({ name: 'title_img' })
  titleImg: string;

  @Column('text', { name: 'image_url' })
  imageURLs: string[];

  @Column()
  grade: number;

  @Column({ name: 'parent_id' })
  parent: number;

  @Column()
  price: number;

  @Column()
  sale: number;

  @Column({ name: 'categories_id' })
  categoriesId: number;

  @Column({ name: 'brands_id' })
  brandsId: number;

  @JoinColumn({ name: 'parent_id' })
  @ManyToOne(() => Items, (item) => item.id)
  parentId: Items;

  @JoinColumn({ name: 'categories_id' })
  @ManyToOne(() => Categories, (categories) => categories.id)
  categories: Categories;

  @JoinColumn({ name: 'brands_id' })
  @ManyToOne(() => Brands, (brand) => brand.id)
  brands: Brands;

  @ManyToMany(() => Characteristics, (characteristics) => characteristics.id)
  @JoinTable({
    name: 'characteristics_items',
    joinColumn: { name: 'items_id', referencedColumnName: 'id' },
    inverseJoinColumn: {
      name: 'characteristics_id',
      referencedColumnName: 'id',
    },
  })
  characteristics: Characteristics[];
}

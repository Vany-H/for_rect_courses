import { Timestamps } from 'src/shared/helper/timestamp.abstract';
import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Brands extends Timestamps {
  @PrimaryColumn()
  id: number;

  @Column()
  name: string;
}

import { Timestamps } from 'src/shared/helper/timestamp.abstract';
import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Characteristics extends Timestamps {
  @PrimaryColumn()
  id: number;

  @PrimaryColumn()
  code: string;

  @Column()
  type: string;
}

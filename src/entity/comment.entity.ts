import { Timestamps } from 'src/shared/helper/timestamp.abstract';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { Items } from './items.entity';

@Entity()
export class Comments extends Timestamps {
  @PrimaryColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  comment: string;

  @Column({ name: 'item_id' })
  itemId: number;

  @Column({ name: 'reply_id' })
  replyId: number;

  @ManyToOne(() => Items, (item) => item.id)
  @JoinColumn({ name: 'item_id' })
  item: Items;

  @ManyToOne(() => Comments, (comment) => comment.id)
  @JoinColumn({ name: 'reply_id' })
  replyComment: Comments;
}

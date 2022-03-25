import { MigrationInterface, QueryRunner } from 'typeorm';

export class ordersItems1648206149130 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        create table orders_items (
            orders_id int references orders(id) on delete cascade,
            items_id int references items(id) on delete cascade,
            quantity int not null default 1
        )
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}

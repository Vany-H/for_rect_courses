import { MigrationInterface, QueryRunner } from 'typeorm';

export class itemsCategory1647607288797 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      create table items_categories (
        categories_id int references items(id) on delete cascade,
        items_id int references items(id) on delete cascade,
        PRIMARY KEY (categories_id, items_id)
      )
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      drop table items_category 
    `);
  }
}

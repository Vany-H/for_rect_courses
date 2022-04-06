import { MigrationInterface, QueryRunner } from 'typeorm';

export class deleteCIAddItemField1648038779834 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      drop table items_categories 
    `);

    await queryRunner.query(`
        ALTER TABLE items
            ADD COLUMN categories_id int references categories(id) on delete cascade
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
        ALTER TABLE items
            DROP COLUMN categories_id 
    `);

    await queryRunner.query(`
        create table items_categories (
            categories_id int references items(id) on delete cascade,
            items_id int references items(id) on delete cascade,
            PRIMARY KEY (categories_id, items_id)
        )
    `);
  }
}

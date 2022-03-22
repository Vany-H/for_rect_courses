import { MigrationInterface, QueryRunner } from 'typeorm';

export class characteristicsItems1647610157662 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      create table characteristics_items (
        characteristics_id int references characteristics(id) on delete cascade,
        items_id int references items(id) on delete cascade,
        value varchar,
        PRIMARY KEY (characteristics_id, items_id)
      )
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      drop table characteristics_items 
    `);
  }
}

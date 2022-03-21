import { MigrationInterface, QueryRunner } from 'typeorm';

export class items1647607218780 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      create table items (
        id int generated by default as identity primary key,
        name varchar(150),
        title_img text,
        image_URL text[],
        grade numeric(3, 2) default 0.00,
        parent_id int references items(id) on delete cascade,
        price numeric(1000, 2) not null,
        sale numeric(3, 2),
        created_at timestamptz not null,
        updated_at timestamptz not null
      )
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      drop table items 
    `);
  }
}

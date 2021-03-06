import { MigrationInterface, QueryRunner } from 'typeorm';

export class category1647607261350 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            create table categories (
              id int generated by default as identity primary key,
              name varchar(100),
              created_at timestamptz not null,
              updated_at timestamptz not null
            )
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      drop table categories 
    `);
  }
}

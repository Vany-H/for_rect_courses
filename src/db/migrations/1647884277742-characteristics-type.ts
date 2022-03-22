import { MigrationInterface, QueryRunner } from 'typeorm';

export class characteristicsType1647884277742 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
      ALTER TABLE table_name
        ADD COLUMN type varchar(50)
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
      ALTER TABLE table_name
        DROP COLUMN type
    `);
  }
}

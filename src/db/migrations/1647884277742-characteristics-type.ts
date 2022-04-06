import { Logger } from '@nestjs/common';
import { MigrationInterface, QueryRunner } from 'typeorm';

export class characteristicsType1647884277742 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    Logger.log('a----------------------------------------');
    await queryRunner.query(`
      ALTER TABLE characteristics
        ADD COLUMN type varchar(50)
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE characteristics
        DROP COLUMN type
    `);
  }
}

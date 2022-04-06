import { Logger } from '@nestjs/common';
import { MigrationInterface, QueryRunner } from 'typeorm';
import characteristics from './characteristics';

export class characteristics1647788922290 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const characteristicsArray = Object.entries(characteristics);

    for (const characteristic of characteristicsArray) {
      await queryRunner.query(
        `UPDATE characteristics
        SET type = '${characteristic[1]}'
        WHERE code = '${characteristic[0]}'`,
      );
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`DELETE FROM characteristics WHERE id not null`);
  }
}

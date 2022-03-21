import { Logger } from '@nestjs/common';
import { MigrationInterface, QueryRunner } from 'typeorm';
import characteristics from './characteristics';

export class characteristics1647788922280 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const characteristicsName = Object.entries(characteristics).map(
      ([name]) => name,
    );
    Logger.log(characteristicsName)
    queryRunner.query(
      `INSERT INTO characteristics (code, created_at, updated_at) VALUES ${characteristicsName.map(
        (el, index) => `('${el}', now(), now())`,
        characteristicsName,
      )}`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`DELETE FROM characteristics WHERE id not null`);
  }
}

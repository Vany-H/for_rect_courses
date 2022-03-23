import { MigrationInterface, QueryRunner } from 'typeorm';
import brands from './brands';

export class brands1647969871650 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(
      `INSERT INTO brands (name, created_at, updated_at) VALUES ${brands.map(
        (el, index) => `('${el}', now(), now())`,
      )}`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`DELETE FROM brands WHERE id not null`);
  }
}

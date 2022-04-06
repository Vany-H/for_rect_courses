import { MigrationInterface, QueryRunner } from 'typeorm';
import categories from './categories';

export class categories1649151042073 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `INSERT INTO categories (name, created_at, updated_at) VALUES ${categories.map(
        (el, index) => `('${el}', now(), now())`,
      )}`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE FROM brands WHERE id not null`);
  }
}

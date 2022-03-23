import { MigrationInterface, QueryRunner } from 'typeorm';

export class brandsItems1647970381759 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
        ALTER TABLE items
            ADD COLUMN brands_id int references brands(id) on delete cascade
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
        ALTER TABLE items
            DROP COLUMN brands_id 
    `);
  }
}

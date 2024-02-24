import { MigrationInterface, QueryRunner } from 'typeorm';

export class Addsurname1708804533186 implements MigrationInterface {
  name = 'Addsurname1708804533186';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" ADD "surname" text`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "surname"`);
  }
}

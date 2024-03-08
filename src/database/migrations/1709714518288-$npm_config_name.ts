import { MigrationInterface, QueryRunner } from "typeorm";

export class  $npmConfigName1709714518288 implements MigrationInterface {
    name = ' $npmConfigName1709714518288'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "follows" DROP CONSTRAINT "FK_bf77ff070e6577680f2716f2652"`);
        await queryRunner.query(`ALTER TABLE "follows" RENAME COLUMN "followersId" TO "followerId"`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "name" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email")`);
        await queryRunner.query(`ALTER TABLE "follows" ADD CONSTRAINT "FK_fdb91868b03a2040db408a53331" FOREIGN KEY ("followerId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "follows" DROP CONSTRAINT "FK_fdb91868b03a2040db408a53331"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3"`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "name" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "follows" RENAME COLUMN "followerId" TO "followersId"`);
        await queryRunner.query(`ALTER TABLE "follows" ADD CONSTRAINT "FK_bf77ff070e6577680f2716f2652" FOREIGN KEY ("followersId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}

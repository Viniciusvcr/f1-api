import {MigrationInterface, QueryRunner} from "typeorm";

export class ConstructorMigration1628300672210 implements MigrationInterface {
    name = 'ConstructorMigration1628300672210'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "Constructor" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "nationality" character varying NOT NULL, "foundationYear" integer NOT NULL, "championshipEntryYear" integer NOT NULL, "championshipLeavingYear" integer, "website" character varying, "previousName" character varying, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_8e82252a860c2c4913995211859" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "Constructor"`);
    }

}

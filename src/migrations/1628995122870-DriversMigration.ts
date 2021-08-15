import {MigrationInterface, QueryRunner} from "typeorm";

export class DriversMigration1628995122870 implements MigrationInterface {
    name = 'DriversMigration1628995122870'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."Person" DROP CONSTRAINT "FK_f597ffc2e4d437b765040c78557"`);
        await queryRunner.query(`ALTER TABLE "public"."Person" RENAME COLUMN "teamId" TO "currentTeamId"`);
        await queryRunner.query(`CREATE TABLE "Driver" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "nationality" character varying NOT NULL, "birthday" date NOT NULL, "birthplace" character varying NOT NULL, "height" double precision NOT NULL, "role" "Driver_role_enum" NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "carNumber" integer NOT NULL, "grandPrixEntries" integer NOT NULL DEFAULT '0', "WDCs" integer NOT NULL DEFAULT '0', "wins" integer NOT NULL DEFAULT '0', "podiums" integer NOT NULL DEFAULT '0', "careerPoints" double precision NOT NULL DEFAULT '0', "fastestLaps" integer NOT NULL DEFAULT '0', "firstGrandPrix" character varying, "lastGrandPrix" character varying, "firstVictory" character varying, "lastVictory" character varying, "currentTeamId" integer, CONSTRAINT "PK_9b78eddc1b0c643ec4e956eaac5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TYPE "public"."Person_role_enum" RENAME TO "Person_role_enum_old"`);
        await queryRunner.query(`CREATE TYPE "public"."Person_role_enum" AS ENUM('0', '1', '2', '3', '4', '5')`);
        await queryRunner.query(`ALTER TABLE "public"."Person" ALTER COLUMN "role" TYPE "public"."Person_role_enum" USING "role"::"text"::"public"."Person_role_enum"`);
        await queryRunner.query(`DROP TYPE "public"."Person_role_enum_old"`);
        await queryRunner.query(`ALTER TABLE "public"."Person" ADD CONSTRAINT "FK_a4d005e0a3b7890aa3b44090f1c" FOREIGN KEY ("currentTeamId") REFERENCES "Constructor"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Driver" ADD CONSTRAINT "FK_7136da8139cc8ef67b2aa7c1625" FOREIGN KEY ("currentTeamId") REFERENCES "Constructor"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Driver" DROP CONSTRAINT "FK_7136da8139cc8ef67b2aa7c1625"`);
        await queryRunner.query(`ALTER TABLE "public"."Person" DROP CONSTRAINT "FK_a4d005e0a3b7890aa3b44090f1c"`);
        await queryRunner.query(`CREATE TYPE "public"."Person_role_enum_old" AS ENUM('0', '1', '2', '3', '4')`);
        await queryRunner.query(`ALTER TABLE "public"."Person" ALTER COLUMN "role" TYPE "public"."Person_role_enum_old" USING "role"::"text"::"public"."Person_role_enum_old"`);
        await queryRunner.query(`DROP TYPE "public"."Person_role_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."Person_role_enum_old" RENAME TO "Person_role_enum"`);
        await queryRunner.query(`DROP TABLE "Driver"`);
        await queryRunner.query(`ALTER TABLE "public"."Person" RENAME COLUMN "currentTeamId" TO "teamId"`);
        await queryRunner.query(`ALTER TABLE "public"."Person" ADD CONSTRAINT "FK_f597ffc2e4d437b765040c78557" FOREIGN KEY ("teamId") REFERENCES "Constructor"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}

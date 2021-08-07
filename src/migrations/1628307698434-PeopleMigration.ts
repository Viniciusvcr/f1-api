import {MigrationInterface, QueryRunner} from "typeorm";

export class PeopleMigration1628307698434 implements MigrationInterface {
    name = 'PeopleMigration1628307698434'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "Person" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "nationality" character varying NOT NULL, "birthday" date NOT NULL, "birthplace" character varying NOT NULL, "height" double precision NOT NULL, "role" "Person_role_enum" NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "teamId" integer, CONSTRAINT "PK_5c3ede2b2959b65c86663e58180" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "Person" ADD CONSTRAINT "FK_f597ffc2e4d437b765040c78557" FOREIGN KEY ("teamId") REFERENCES "Constructor"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Person" DROP CONSTRAINT "FK_f597ffc2e4d437b765040c78557"`);
        await queryRunner.query(`DROP TABLE "Person"`);
    }

}

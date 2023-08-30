import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class UsersMigration1692924597885 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(
			new Table({
				name: "users",
				columns: [
					{
						name: "id",
						type: "uuid",
						generationStrategy: "uuid",
						isGenerated: true,
						isNullable: false,
						isPrimary: true,
					},
					{
						name: "name",
						type: "varchar",
						isNullable: false,
					},
					{
						name: "email",
						type: "varchar",
						isUnique: true,
						isNullable: false,
					},
					{
						name: "password",
						type: "varchar",
						isNullable: false,
					},
					{
						name: "created_at",
						default: "now()",
						type: "timestamp",
						isNullable: false,
					},
				],
			})
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable("users", true, true, true);
	}
}

import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class NotesMigration1692924656170 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(
			new Table({
				name: "notes",
				columns: [
					{
						name: "id",
						type: "uuid",
						isNullable: false,
						generationStrategy: "uuid",
						isGenerated: true,
						isPrimary: true,
					},
					{
						name: "title",
						type: "varchar",
						isNullable: false,
					},
					{
						name: "description",
						type: "varchar",
						isNullable: false,
					},
					{
						name: "archived",
						type: "boolean",
						default: false,
					},
					{
						name: "created_at",
						type: "timestamp",
						default: "now()",
						isNullable: false,
					},
					{
						name: "author_id",
						type: "uuid",
						isNullable: false,
					},
				],
				foreignKeys: [
					{
						name: "notes_author_id",
						columnNames: ["author_id"],
						referencedTableName: "users",
						referencedColumnNames: ["id"],
					},
				],
			})
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable("notes", true, true, true);
	}
}

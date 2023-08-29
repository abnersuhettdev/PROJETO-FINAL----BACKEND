import "dotenv/config";

import { DataSourceOptions } from "typeorm";
import { NotesEntity } from "./entities/notes.entity";
import { UsersEntity } from "./entities/users.entity";
import { UsersMigration1692924597885 } from "./migrations/1692924597885-UsersMigration";
import { NotesMigration1692924656170 } from "./migrations/1692924656170-NotesMigration";

const env = process.env.NODE_ENV;

const configProd: DataSourceOptions = {
	type: "postgres",
	url: process.env.DATABASE_URL,
	logging: false,
	ssl: true,
	migrations: [UsersMigration1692924597885, NotesMigration1692924656170],
	entities: [UsersEntity, NotesEntity],
};

const configDev: DataSourceOptions = {
	type: "postgres",
	url: process.env.DATABASE_URL,
	logging: env !== "production",
	ssl: {
		rejectUnauthorized: false,
	},
	migrations: [UsersMigration1692924597885, NotesMigration1692924656170],
	entities: [UsersEntity, NotesEntity],
};

export default env === "production" ? configProd : configDev;

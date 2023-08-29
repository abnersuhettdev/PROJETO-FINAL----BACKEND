import "dotenv/config";
import { DataSourceOptions } from "typeorm";

const env = process.env.NODE_ENV;

const configProd: DataSourceOptions = {
	type: "postgres",
	url: process.env.DATABASE_URL,
	logging: false,
	ssl: true,
	migrations: ["./migrations/*.js"],
	entities: ["./entities/*.entity.js"],
};

const configDev: DataSourceOptions = {
	type: "postgres",
	url: process.env.DATABASE_URL,
	logging: env !== "production",
	ssl: {
		rejectUnauthorized: false,
	},
	migrations: ["./migrations/*.{js,ts}"],
	entities: ["./entities/*.entity.{js,ts}"],
};

export default env === "production" ? configProd : configDev;

import { CreateDateColumn, PrimaryGeneratedColumn } from "typeorm";

export abstract class BaseEntity {
	@PrimaryGeneratedColumn("uuid")
	id!: string;

	@CreateDateColumn({ name: "created_at" })
	createdAt!: Date;
}

import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { BaseEntity } from "./base.entity";
import { UsersEntity } from "./users.entity";

@Entity({ name: "notes" })
export class NotesEntity extends BaseEntity {
	@Column()
	title!: string;

	@Column()
	description!: string;

	@Column()
	authorId!: string;

	@ManyToOne(() => UsersEntity, (u) => u.notes)
	@JoinColumn({
		name: "author_id",
		referencedColumnName: "id",
	})
	author!: UsersEntity;

	@Column()
	password!: string;

	@Column()
	archived!: boolean;
}

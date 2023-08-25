import { Column, Entity, OneToMany } from "typeorm";
import { Note } from "../../models";
import { BaseEntity } from "./base.entity";
import { NotesEntity } from "./notes.entity";

@Entity({ name: "users" })
export class UsersEntity extends BaseEntity {
	@Column()
	name!: string;

	@Column({ unique: true })
	email!: string;

	@Column()
	password!: string;

	@OneToMany(() => NotesEntity, (n) => n.author)
	notes!: Note[];
}

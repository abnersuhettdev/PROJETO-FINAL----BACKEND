// @ts-nocheck
//
import { Note } from "../../models";
import { UserRepository } from "../../repositories";
import { NotesRepository } from "../../repositories/Notes/notes.repository";

type RetornoListNote = {
	success: boolean;
	message: string;
	data?: Note[];
};

export type FilterNote = {
	title?: string;
	archived?: boolean;
};

export class ListNotes {
	async execute(authorId: string, filters: FilterNote) {
		const repository = new NotesRepository();
		const userRepository = new UserRepository();

		const userExists = await userRepository
			.listUsers()
			.find((user) => user.id === authorId);

		if (!userExists) {
			throw new Error("Usuario nao existe");
		}

		let authorList = repository.listNotes(authorId);

		if (filters?.title) {
			authorList = authorList.filter((note) =>
				note.toJson().title.includes(filters.title!)
			);
		}

		if (filters?.archived != undefined) {
			authorList = authorList.filter(
				(note) => note.toJson().archived == filters.archived
			);
		}

		return {
			success: true,
			message: "Listagem feita com sucesso",
			data: authorList,
		};
	}
}

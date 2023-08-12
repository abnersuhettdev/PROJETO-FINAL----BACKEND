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
	arquived?: boolean;
};

export class ListNotes {
	execute(authorId: string, filters: FilterNote): RetornoListNote {
		const repository = new NotesRepository();
		const userRepository = new UserRepository();

		const userExists = userRepository
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

		if (filters?.arquived != undefined) {
			authorList = authorList.filter(
				(note) => note.toJson().arquived == filters.arquived
			);
		}

		return {
			success: true,
			message: "Listagem feita com sucesso",
			data: authorList,
		};
	}
}

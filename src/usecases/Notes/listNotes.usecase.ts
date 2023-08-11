import { Note } from "../../models";
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

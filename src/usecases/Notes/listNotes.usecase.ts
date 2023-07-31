import { Note } from "../../models";
import { NotesRepository } from "../../repositories/Notes/notes.repository";

type RetornoListNote = {
	success: boolean;
	message: string;
	data?: Note[];
};

export class ListNotes {
	execute(authorId: string): RetornoListNote {
		const repository = new NotesRepository();

		const authorList = repository.listNotes(authorId);

		return {
			success: true,
			message: "Nota cadastrada com sucesso",
			data: authorList,
		};
	}
}

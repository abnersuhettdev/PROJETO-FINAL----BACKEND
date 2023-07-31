import { Note } from "../../models";
import { NotesRepository } from "../../repositories/Notes/notes.repository";

export type CreateNoteDTO = {
	title: string;
	description: string | undefined;
	authorId: string;
};

type RetornoCreate = {
	success: boolean;
	message: string;
	data?: Note;
};

export class CreateNote {
	execute(dados: CreateNoteDTO): RetornoCreate {
		const repository = new NotesRepository();

		const newNote = repository.createNote(dados);

		return {
			success: true,
			message: "Nota cadastrada com sucesso",
			data: newNote,
		};
	}
}

import { OutputNote } from "../../models";
import { NotesRepository } from "../../repositories/Notes/notes.repository";

export type CreateNoteDTO = {
	title: string;
	description: string | undefined;
	authorId: string;
};

type RetornoCreate = {
	success: boolean;
	message: string;
	data?: OutputNote;
};

export class CreateNote {
	execute(data: CreateNoteDTO): RetornoCreate {
		const repository = new NotesRepository();

		const newNote = repository.createNote(data);

		return {
			success: true,
			message: "Nota cadastrada com sucesso",
			data: newNote.toJson(),
		};
	}
}

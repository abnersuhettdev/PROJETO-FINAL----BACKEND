import { OutputNote } from "../../models";
import { NotesRepository } from "../../repositories/Notes/notes.repository";

type RetornoUpdateNote = {
	success: boolean;
	message: string;
	data?: OutputNote;
};

export type NoteUpdate = {
	title?: string;
	description?: string;
	noteId: string;
};

export class UpdateNote {
	execute(note: NoteUpdate, authorId: string): RetornoUpdateNote {
		const repository = new NotesRepository();

		const updatedNote = repository.updateNote(note);

		return {
			success: true,
			message: "Nota atualizada com sucesso",
			data: updatedNote.toJson(),
		};
	}
}

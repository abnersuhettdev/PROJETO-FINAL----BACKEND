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
	async execute(note: NoteUpdate, authorId: string): Promise<RetornoUpdateNote> {
		const repository = new NotesRepository();

		const updatedNote = await repository.updateNote(note);

		return {
			success: true,
			message: "Nota atualizada com sucesso",
			data: updatedNote.toJson(),
		};
	}
}

import { Note } from "../../models";
import { NotesRepository } from "../../repositories/Notes/notes.repository";

type RetornoDeleteNote = {
	success: boolean;
	message: string;
	data?: Note;
};

export class DeleteNote {
	execute(noteId: string): RetornoDeleteNote {
		const repository = new NotesRepository();

		const deletedNote = repository.deleteNote(noteId);

		return {
			success: true,
			message: "Nota deletada com sucesso",
			data: deletedNote,
		};
	}
}

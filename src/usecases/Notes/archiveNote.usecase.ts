import { Note } from "../../models";
import { NotesRepository } from "../../repositories/Notes/notes.repository";

type RetornoArchiveNote = {
	success: boolean;
	message: string;
	data?: Note;
};

export class ArchiveNote {
	execute(noteId: string): RetornoArchiveNote {
		const repository = new NotesRepository();

		const archivedNote = repository.archiveNote(noteId);

		return {
			success: true,
			message: "Nota arquivada com sucesso",
			data: archivedNote,
		};
	}
}

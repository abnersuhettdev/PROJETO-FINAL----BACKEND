import { Note } from "../../models";
import { NotesRepository } from "../../repositories/Notes/notes.repository";

type RetornoArchiveNote = {
	success: boolean;
	message: string;
	data?: Note;
};

export class ArchiveNote {
	async execute(noteId: string) {
		const repository = new NotesRepository();

		const archivedNote = await repository.archiveNote(noteId);

		return {
			success: true,
			message: "Nota arquivada com sucesso",
			data: archivedNote,
		};
	}
}

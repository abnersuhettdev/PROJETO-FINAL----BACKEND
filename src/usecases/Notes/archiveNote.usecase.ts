import { NotesRepository } from "../../repositories/Notes/notes.repository";

type RetornoArchiveNote = {
	success: boolean;
	message: string;
};

export class ArchiveNote {
	async execute(noteId: string): Promise<RetornoArchiveNote> {
		const repository = new NotesRepository();

		const archivedNote = await repository.archiveNote(noteId);

		return {
			success: true,
			message: "Nota arquivada com sucesso",
		};
	}
}

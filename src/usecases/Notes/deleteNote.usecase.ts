import { NotesRepository } from "../../repositories/Notes/notes.repository";

type RetornoDeleteNote = {
	success: boolean;
	message: string;
};

export class DeleteNote {
	async execute(noteId: string): Promise<RetornoDeleteNote> {
		const repository = new NotesRepository();

		await repository.deleteNote(noteId);

		return {
			success: true,
			message: "Nota deletada com sucesso",
		};
	}
}

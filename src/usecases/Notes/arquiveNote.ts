import { Note } from "../../models";
import { NotesRepository } from "../../repositories/Notes/notes.repository";

type RetornoArquiveNote = {
	success: boolean;
	message: string;
	data?: Note;
};

export class ArquiveNote {
	execute(noteId: string): RetornoArquiveNote {
		const repository = new NotesRepository();

		const arquivedNote = repository.arquiveNote(noteId);

		return {
			success: true,
			message: "Nota arquivada com sucesso",
			data: arquivedNote,
		};
	}
}

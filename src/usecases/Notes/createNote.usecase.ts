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
	async execute(data: CreateNoteDTO): Promise<RetornoCreate> {
		const repository = new NotesRepository();

		const newNote = await repository.createNote(data);

		return {
			success: true,
			message: "Nota cadastrada com sucesso",
			data: newNote.toJson(),
		};
	}
}

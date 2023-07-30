import { User } from "../../models";
import { NotesRepository } from "../../repositories/Notes/notes.repository";

export type NoteDTO = {
	title: string;
	description: string | undefined;
	author: User;
	arquived: boolean;
};

type RetornoCreate = {
	success: boolean;
	message: string;
	data?: NoteDTO & { id: string };
};

export class CreateNote {
	execute(dados: NoteDTO): RetornoCreate {
		const repository = new NotesRepository();

		const newNote = repository.createNote(dados);

		return {
			success: true,
			message: "Nota cadastrada com sucesso",
			data: newNote,
		};
	}
}

// @ts-nocheck
//
import { Note } from "../../models";
import { UserRepository } from "../../repositories";
import { NotesRepository } from "../../repositories/Notes/notes.repository";

type RetornoListNote = {
	success: boolean;
	message: string;
	data?: Note[];
};

export type FilterNote = {
	title?: string;
	archived?: boolean;
};

export class ListNotes {
	async execute(
		authorId: string,
		filters: FilterNote
	): Promise<RetornoListNote> {
		const repository = new NotesRepository();
		const userRepository = new UserRepository();

		const authorList = await repository.listNotes(authorId, filters);

		return {
			success: true,
			message: "Listagem feita com sucesso",
			data: authorList,
		};
	}
}

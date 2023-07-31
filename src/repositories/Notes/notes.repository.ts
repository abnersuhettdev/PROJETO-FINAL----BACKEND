import { databaseNotes } from "../../database";
import { Note } from "../../models";
import { CreateNoteDTO } from "../../usecases";

export class NotesRepository {
	listNotes(authorId: string) {
		const notes: Note[] = databaseNotes;
		const authorNotes = notes.filter(
			(note) => note.toJson().authorId === authorId
		);

		return authorNotes;
	}

	createNote(dados: CreateNoteDTO) {
		const note = new Note(dados.title, dados.description, dados.authorId);

		databaseNotes.push(note);

		return note;
	}
}

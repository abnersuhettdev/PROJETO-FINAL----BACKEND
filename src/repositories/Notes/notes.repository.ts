import { databaseNotes } from "../../database";
import { Note } from "../../models";
import { CreateNoteDTO } from "../../usecases";
import { NoteUpdate } from "../../usecases/Notes/updateNote";

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

	updateNote(dados: NoteUpdate): Note {
		const noteIndex = databaseNotes.findIndex(
			(note) => note.toJson().id === dados.noteId
		);

		if (noteIndex === -1) {
			throw new Error("Nota não encontrada");
		}

		databaseNotes[noteIndex].update(dados);
		return databaseNotes[noteIndex];
	}
}

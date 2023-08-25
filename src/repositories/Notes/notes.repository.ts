import { pgHelper } from "../../database/pg-helper";
import { Note } from "../../models";
import { CreateNoteDTO, NoteUpdate } from "../../usecases";

export class NotesRepository {
	constructor(private _manager = pgHelper.client.manager) {}

	async listNotes(authorId: string) {
		const authorNotes = databaseNotes.filter(
			(note) => note.toJson().authorId === authorId
		);

		return authorNotes;
	}

	createNote(data: CreateNoteDTO) {
		const note = new Note(data.title, data.description, data.authorId);

		databaseNotes.push(note);

		return note;
	}

	updateNote(data: NoteUpdate): Note {
		const noteIndex = databaseNotes.findIndex(
			(note) => note.toJson().id === data.noteId
		);

		if (noteIndex === -1) {
			throw new Error("Nota não encontrada");
		}

		databaseNotes[noteIndex].update(data);
		return databaseNotes[noteIndex];
	}

	archiveNote(noteId: string) {
		const noteIndex = databaseNotes.findIndex(
			(note) => note.toJson().id === noteId
		);

		if (noteIndex === -1) {
			throw new Error("Nota não encontrada");
		}

		databaseNotes[noteIndex].toggleArchived();

		return databaseNotes[noteIndex];
	}

	deleteNote(noteId: string) {
		const noteIndex = databaseNotes.findIndex(
			(note) => note.toJson().id === noteId
		);

		if (noteIndex === -1) {
			throw new Error("Nota não encontrada");
		}

		const deletedNote = databaseNotes.splice(noteIndex, 1);

		return deletedNote[0];
	}
}

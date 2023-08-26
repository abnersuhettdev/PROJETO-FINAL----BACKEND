import { NotesEntity } from "../../database/entities/notes.entity";
import { pgHelper } from "../../database/pg-helper";
import { Note } from "../../models";
import { CreateNoteDTO, NoteUpdate } from "../../usecases";

export class NotesRepository {
	constructor(private _manager = pgHelper.client.manager) {}

	async listNotes(authorId: string) {
		const authorNotes = await this._manager.find(NotesEntity, {
			where: {
				authorId,
			},
		});

		// const authorNotes = databaseNotes.filter(
		// 	(note) => note.toJson().authorId === authorId
		// );

		return authorNotes;
	}

	async createNote(data: CreateNoteDTO) {
		const noteDB = this._manager.create(NotesEntity, data);

		await this._manager.save(NotesEntity, noteDB);

		const note = this.entityToModel(noteDB as NotesEntity);

		// const note = new Note(data.title, data.description, data.authorId);

		// databaseNotes.push(note);

		return note;
	}

	async updateNote(data: NoteUpdate) {
		const { noteId, description, title } = data;

		const updatedNoteDB = await this._manager.update(
			NotesEntity,
			{ id: noteId },
			{ title, description }
		);
		// const noteIndex = databaseNotes.findIndex(
		// 	(note) => note.toJson().id === data.noteId
		// );
		// if (noteIndex === -1) {
		// 	throw new Error("Nota não encontrada");
		// }
		// databaseNotes[noteIndex].update(data);
		// return databaseNotes[noteIndex];

		const updatedNote = this.entityToModel(
			updatedNoteDB as unknown as NotesEntity
		);

		return updatedNote;
	}

	async archiveNote(noteId: string) {
		const noteDB = await this._manager.findOneBy(NotesEntity, { id: noteId });

		this.entityToModel(noteDB as NotesEntity).toggleArchived();

		// const noteIndex = databaseNotes.findIndex(
		// 	(note) => note.toJson().id === noteId
		// );

		// if (noteIndex === -1) {
		// 	throw new Error("Nota não encontrada");
		// }

		// databaseNotes[noteIndex].toggleArchived();

		// return databaseNotes[noteIndex];
	}

	async deleteNote(noteId: string) {
		const deletedNote = await this._manager.delete(NotesEntity, {
			where: {
				id: noteId,
			},
		});

		// const noteIndex = databaseNotes.findIndex(
		// 	(note) => note.toJson().id === noteId
		// );
		// if (noteIndex === -1) {
		// 	throw new Error("Nota não encontrada");
		// }
		// const deletedNote = databaseNotes.splice(noteIndex, 1);
		return deletedNote;
	}

	private entityToModel(dataDB: NotesEntity): Note {
		const note = new Note(dataDB.title, dataDB.description, dataDB.authorId);

		return note;
	}
}

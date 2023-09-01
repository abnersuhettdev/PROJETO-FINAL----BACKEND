import { Like } from "typeorm";
import { NotesEntity } from "../../database/entities/notes.entity";
import { pgHelper } from "../../database/pg-helper";
import { Note } from "../../models";
import { CreateNoteDTO, FilterNote, NoteUpdate } from "../../usecases";

export class NotesRepository {
	constructor(private _manager = pgHelper.client.manager) {}

	async listNotes(authorId: string, filters: FilterNote) {
		const isFilters: any = {};

		if (filters.title) {
			isFilters.title = Like(`%${filters.title}%`);
		}

		if (filters.archived) {
			isFilters.archived = filters.archived;
		}

		const authorNotes = await this._manager.find(NotesEntity, {
			where: {
				authorId,
				...isFilters,
			},
		});

		return authorNotes.map(this.entityToModel);
	}

	async createNote(data: CreateNoteDTO) {
		const noteDB = this._manager.create<NotesEntity>(NotesEntity, data);
		noteDB.authorId = data.authorId;

		await this._manager.save(NotesEntity, noteDB);

		const note = this.entityToModel(noteDB as NotesEntity);

		return note;
	}

	async updateNote(data: NoteUpdate) {
		const { noteId, description, title } = data;

		const updatedNoteDB = await this._manager.update(
			NotesEntity,
			{ id: noteId },
			{ title, description }
		);

		const updatedNote = this.entityToModel(
			updatedNoteDB as unknown as NotesEntity
		);

		updatedNote.update({ title, description });

		return updatedNote.toJson();
	}

	async archiveNote(noteId: string) {
		const noteDB = await this._manager.findOneBy(NotesEntity, { id: noteId });

		if (!noteDB) {
			throw new Error("Nota inexistente");
		}

		const archivedNote = this.entityToModel(noteDB);
		archivedNote.toggleArchived();

		await this._manager.update(NotesEntity, noteId, {
			archived: archivedNote.toJson().archived,
		});

		return archivedNote;
	}

	async deleteNote(noteId: string) {
		const noteDB = await this._manager.findOneBy(NotesEntity, { id: noteId });

		if (!noteDB) {
			throw new Error("Nota inexistente");
		}

		const deletedNote = this.entityToModel(noteDB);

		await this._manager.delete(NotesEntity, { id: noteId });

		return deletedNote;
	}

	private entityToModel(dataDB: NotesEntity): Note {
		const note = Note.mapDB(dataDB);

		return note;
	}
}

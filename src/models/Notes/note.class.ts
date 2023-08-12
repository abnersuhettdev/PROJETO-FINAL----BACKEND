import { NoteUpdate } from "../../usecases/Notes/updateNote.usecase";
import { BaseClass } from "../BaseClass/baseClass.class";

export type OutputNote = {
	id: string;
	title: string;
	description: string | undefined;
	authorId: string;
	createdAt: string;
	archived: boolean;
};

export class Note extends BaseClass {
	constructor(
		private title: string,
		private description: string | undefined,
		private authorId: string,
		private archived: boolean = false,
		private createdAt: string = new Date().toLocaleDateString("pt-BR", {
			month: "2-digit",
			day: "2-digit",
			year: "numeric",
		})
	) {
		super();
	}

	toJson(): OutputNote {
		return {
			id: this.id,
			title: this.title,
			description: this.description,
			createdAt: this.createdAt,
			archived: this.archived,
			authorId: this.authorId,
		};
	}

	update(noteUpdate: Omit<NoteUpdate, "noteId">) {
		if (noteUpdate.title) {
			this.title = noteUpdate.title;
		}

		if (noteUpdate.description) {
			this.description = noteUpdate.description;
		}
	}

	toggleArchived() {
		this.archived = !this.archived;
	}
}

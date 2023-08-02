import { NoteUpdate } from "../../usecases/Notes/updateNote";
import { BaseClass } from "../BaseClass/baseClass.class";

export type OutputNote = {
	id: string;
	title: string;
	description: string | undefined;
	authorId: string;
	arquived: boolean;
};

export class Note extends BaseClass {
	constructor(
		private title: string,
		private description: string | undefined,
		private authorId: string,
		private arquived: boolean = false
	) {
		super();
	}

	toJson(): OutputNote {
		return {
			id: this.id,
			title: this.title,
			description: this.description,
			arquived: this.arquived,
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

	toggleArquived() {
		this.arquived = !this.arquived;
	}
}

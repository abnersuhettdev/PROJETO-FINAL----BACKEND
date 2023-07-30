import { databaseNotes } from "../../database";
import { Note } from "../../models";
import { NoteDTO } from "../../usecases";

export class NotesRepository {
	listNotes() {
		const notes: Note[] = databaseNotes;

		return notes.map((note) => note.toJson());
	}

	createNote(dados: NoteDTO) {
		const note = new Note(
			dados.title,
			dados.description,
			dados.author,
			dados.arquived
		);

		databaseNotes.push(note);

		return note.toJson();
	}

	// findUserByCredentials(dados: LoginDTO) {
	// 	const user = databaseUsers.find(
	// 		(i) =>
	// 			i.toJson().email === dados.email && i.toJson().password === dados.password
	// 	);

	// 	if (!user) return;

	// 	return user.toJson().id;
	// }
}

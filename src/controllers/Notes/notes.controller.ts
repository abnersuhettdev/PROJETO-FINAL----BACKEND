import { Request, Response } from "express";
import { CreateNote, FilterNote, ListNotes } from "../../usecases";
import { ArquiveNote } from "../../usecases/Notes/arquiveNote";
import { DeleteNote } from "../../usecases/Notes/deleteNote";
import { UpdateNote } from "../../usecases/Notes/updateNote";

export class NotesController {
	list(req: Request, res: Response) {
		const { authorId } = req.params;

		const { title, description, arquived } = req.query as FilterNote;

		const usecase = new ListNotes();

		const response = usecase.execute(authorId, { title, description, arquived });

		if (!response.success) {
			return res
				.status(400)
				.send("Não foi possivel encontrar as nota desse usuario");
		}

		return res.status(200).json(response);
	}

	create(req: Request, res: Response) {
		const { title, description, authorId } = req.body;

		const usecase = new CreateNote();

		const response = usecase.execute({ title, description, authorId });

		if (!response.success) {
			return res.status(400).send("Não foi possivel criar a nota");
		}

		return res.status(201).json({ data: response });
	}

	update(req: Request, res: Response) {
		const { title, description } = req.body;
		const { authorId, noteId } = req.params;

		const usecase = new UpdateNote();

		const response = usecase.execute({ title, description, noteId }, authorId);

		if (!response.success) {
			return res.status(400).send("Não foi possivel atualizar a nota");
		}

		res.status(200).json({ message: response.message, data: response.data });
	}

	arquive(req: Request, res: Response) {
		const { noteId } = req.params;

		const usecase = new ArquiveNote();

		const response = usecase.execute(noteId);

		if (!response.success) {
			return res.status(400).send("Não foi possivel arquivar a nota");
		}

		res.status(200).json({ message: response.message, data: response.data });
	}

	delete(req: Request, res: Response) {
		const { noteId } = req.params;

		const usecase = new DeleteNote();

		const response = usecase.execute(noteId);

		if (!response.success) {
			return res.status(400).send("Não foi possivel deletar a nota");
		}

		res.status(200).json({ message: response.message, data: response.data });
	}
}

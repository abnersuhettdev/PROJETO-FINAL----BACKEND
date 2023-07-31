import { Request, Response } from "express";
import { CreateNote, ListNotes } from "../../usecases";

export class NotesController {
	list(req: Request, res: Response) {
		const { authorId } = req.body;

		const usecase = new ListNotes();

		const response = usecase.execute(authorId);

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
}

import { Request, Response } from "express";
import { CreateNote } from "../../usecases";

export class NotesController {
	create(req: Request, res: Response) {
		const { title, description, author, arquived } = req.body;

		const usecase = new CreateNote();

		const response = usecase.execute({ title, description, author, arquived });
	}
}

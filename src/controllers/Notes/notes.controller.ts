import { Request, Response } from "express";
import {
	ArchiveNote,
	CreateNote,
	DeleteNote,
	FilterNote,
	ListNotes,
	UpdateNote,
} from "../../usecases";

export class NotesController {
	async list(req: Request, res: Response) {
		const { authorId } = req.params;

		const { title, archived } = req.query as FilterNote;

		const usecase = new ListNotes();

		const response = await usecase.execute(authorId, { title, archived });

		if (!response.success) {
			return res
				.status(400)
				.send("Não foi possivel encontrar as nota desse usuario");
		}

		return res.status(200).json(response);
	}

	async create(req: Request, res: Response) {
		const { authorId } = req.params;
		const { title, description } = req.body;

		const usecase = new CreateNote();

		const response = await usecase.execute({ title, description, authorId });

		if (!response.success) {
			return res.status(400).send("Não foi possivel criar a nota");
		}

		return res.status(201).json({ data: response });
	}

	async update(req: Request, res: Response) {
		const { title, description } = req.body;
		const { authorId, noteId } = req.params;

		const usecase = new UpdateNote();

		const response = await usecase.execute(
			{ title, description, noteId },
			authorId
		);

		if (!response.success) {
			return res.status(400).send("Não foi possivel atualizar a nota");
		}

		res.status(200).json({
			message: response.message,
			success: response.data,
			data: response.data,
		});
	}

	async archive(req: Request, res: Response) {
		const { noteId } = req.params;

		const usecase = new ArchiveNote();

		const response = await usecase.execute(noteId);

		if (!response.success) {
			return res.status(400).send("Não foi possivel arquivar a nota");
		}

		res.status(200).json({
			message: response.message,
			success: response.data,
			data: response.data,
		});
	}

	async delete(req: Request, res: Response) {
		const { noteId } = req.params;

		const usecase = new DeleteNote();

		const response = await usecase.execute(noteId);

		if (!response.success) {
			return res.status(400).send("Não foi possivel deletar a nota");
		}

		res.status(200).json({ message: response.message, data: response.data });
	}
}

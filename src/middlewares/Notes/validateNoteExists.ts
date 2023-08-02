import { NextFunction, Request, Response } from "express";

export function validateNoteParams(
	req: Request,
	res: Response,
	next: NextFunction
) {
	const { noteId } = req.params;

	if (!noteId) {
		return res
			.status(400)
			.send({ message: "Identificador da nota não encontrado" });
	}

	next();
}

import { NextFunction, Request, Response } from "express";

export function validateUpdateNote(
	req: Request,
	res: Response,
	next: NextFunction
) {
	const { title, description } = req.body;

	if (title && title.length <= 3) {
		return res.status(400).json("Insira no minimo 3 caracteres para atualizar");
	}

	if (description && description.length <= 3) {
		return res.status(400).json("Insira no minimo 3 caracteres para atualizar");
	}

	next();
}

import { NextFunction, Request, Response } from "express";

export function validateDataNote(
	req: Request,
	res: Response,
	next: NextFunction
) {
	const { title, description } = req.body;

	if (!title || !description) {
		return res.status(400).json("Insira o titulo e a descrição");
	}

	if (title.length < 3) {
		return res.status(400).json("Insira no minimo 3 caracteres no título");
	}

	if (description.length < 3) {
		return res.status(400).json("Insira no minimo 3 caracteres na descrição");
	}

	next();
}

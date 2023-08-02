import { NextFunction, Request, Response } from "express";

export function validateUserIsLogged(
	req: Request,
	res: Response,
	next: NextFunction
) {
	const { authorId } = req.params;

	if (!authorId) {
		return res.status(400).json("Nenhum usuário logado");
	}

	next();
}

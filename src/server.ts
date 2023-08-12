import cors from "cors";
import "dotenv/config";
import express from "express";
import { NotesController, UserController } from "./controllers";

import {
	validateDataNote,
	validateDataUser,
	validateNoteParams,
	validateUpdateNote,
	validateUserIsLogged,
	validateUserLogin,
} from "./middlewares";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.listen(process.env.PORT, () => {
	console.log("Servidor rodando na porta ", process.env.PORT);
});

const userController = new UserController();
const notesController = new NotesController();

app.get("/", (req, res) => res.send({ message: "OK" }));
app.post("/users/signup", validateDataUser, userController.create);
app.post("/users/signin", validateUserLogin, userController.signin);

app.get("/notes/:authorId", validateUserIsLogged, notesController.list);

app.post(
	"/notes/:authorId",
	validateUserIsLogged,
	validateDataNote,
	notesController.create
);

app.put(
	"/notes/:authorId/:noteId",
	validateUserIsLogged,
	validateNoteParams,
	validateUpdateNote,
	notesController.update
);

app.put(
	"/notes/:authorId/:noteId/archive",
	validateUserIsLogged,
	validateNoteParams,
	notesController.archive
);

app.delete(
	"/notes/:authorId/:noteId",
	validateUserIsLogged,
	validateNoteParams,
	notesController.delete
);

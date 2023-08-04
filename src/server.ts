import cors from "cors";
import "dotenv/config";
import express from "express";
import { NotesController, UserController } from "./controllers";

import {
	validateDataNote,
	validateDataUser,
	validateUserIsLogged,
	validateUserLogin,
} from "./middlewares";
import { validateNoteParams } from "./middlewares/Notes/validateNoteExists";
import { validateUpdateNote } from "./middlewares/Notes/validateNoteParams";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.listen(process.env.PORT, () => {
	console.log("Servidor rodando na porta ", process.env.PORT);
});

// controllers
const userController = new UserController();

// rotas
app.get("/", (req, res) => res.send({ message: "OK" }));
app.post("/users/signup", validateDataUser, userController.create);
app.post("/users/signin", validateUserLogin, userController.signin);

// CRUD
const notesController = new NotesController();

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
	"/notes/arquived/:authorId/:noteId",
	validateUserIsLogged,
	validateNoteParams,
	notesController.arquive
);

app.delete(
	"/notes/:authorId/:noteId",
	validateUserIsLogged,
	validateNoteParams,
	notesController.delete
);

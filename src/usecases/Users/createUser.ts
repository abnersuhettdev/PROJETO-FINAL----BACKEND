import { UserRepository } from "../../repositories";

export type UserDTO = {
	name: string;
	email: string;
	password: string;
};

export type RetornoCreate = {
	success: boolean;
	message: string;
	data?: UserDTO & { id: string };
};

export class CreateUser {
	execute(dados: UserDTO): RetornoCreate {
		const repository = new UserRepository();

		const userExists = repository
			.listUsers()
			.some((user) => user.email === dados.email);

		if (userExists) {
			return {
				success: false,
				message: "Usuário já cadastrado.",
			};
		}

		const userCreated = repository.createUser(dados);

		return {
			success: true,
			message: "Usuário cadastrado com sucesso",
			data: userCreated,
		};
	}
}

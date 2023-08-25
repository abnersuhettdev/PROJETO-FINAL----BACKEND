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
	async execute(data: UserDTO): Promise<RetornoCreate> {
		const repository = new UserRepository();

		const userExists = await repository.verifyUserExists(data.email);

		if (userExists) {
			return {
				success: false,
				message: "Usuário já cadastrado.",
			};
		}

		const userCreated = await repository.createUser(data);

		return {
			success: true,
			message: "Usuário cadastrado com sucesso",
			data: userCreated.toJson(),
		};
	}
}

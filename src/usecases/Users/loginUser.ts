import { UserRepository } from "../../repositories";

export type LoginDTO = {
	email: string;
	password: string;
};

type LoginUserResponse = {
	success: boolean;
	message: string;
	data?: { id: string; name: string };
};

export class LoginUser {
	async execute(data: LoginDTO): Promise<LoginUserResponse> {
		const repository = new UserRepository();

		const searchUser = await repository.findUserByCredentials(data);

		if (!searchUser || searchUser?.toJson().password !== data.password) {
			return {
				success: false,
				message: "Senha e/ou email incorretos!",
			};
		}

		return {
			success: true,
			message: "Credenciais corretas!",
			data: searchUser.toJson(),
		};
	}
}

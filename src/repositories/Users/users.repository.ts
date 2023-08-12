import { databaseUsers } from "../../database";
import { User } from "../../models";
import { LoginDTO, UserDTO } from "../../usecases";

export class UserRepository {
	listUsers() {
		const users: User[] = databaseUsers;

		return users.map((user) => user.toJson());
	}

	createUser(data: UserDTO) {
		const user = new User(data.name, data.email, data.password);
		databaseUsers.push(user);

		return user.toJson();
	}

	findUserByCredentials(data: LoginDTO) {
		const user = databaseUsers.find(
			(i) =>
				i.toJson().email === data.email && i.toJson().password === data.password
		);

		if (!user) return;

		return { id: user.toJson().id, name: user.toJson().name };
	}
}

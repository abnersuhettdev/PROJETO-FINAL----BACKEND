import { UsersEntity } from "../../database/entities/users.entity";
import { pgHelper } from "../../database/pg-helper";
import { User } from "../../models";
import { LoginDTO, UserDTO } from "../../usecases";

export class UserRepository {
	constructor(private _manager = pgHelper.client.manager) {}

	private mapUserDb(user: UsersEntity): User {
		return User.init(user.id, user.name, user.email, user.password);
	}

	async listUsers() {
		const users: UsersEntity[] = await this._manager.find(UsersEntity);

		return users.map(this.mapUserDb);
	}

	async createUser(data: UserDTO) {
		const user = this._manager.create<UsersEntity>(UsersEntity, data);

		await this._manager.save(user);

		return this.mapUserDb(user);
	}

	async verifyUserExists(email: string) {
		const userExists = await this._manager.exists(UsersEntity, {
			where: { email: email },
		});

		return userExists;
	}

	async findUserByCredentials(data: LoginDTO) {
		const user = await this._manager.findOneBy(UsersEntity, {
			email: data.email,
		});

		if (!user) return;

		return this.mapUserDb(user);
	}
}

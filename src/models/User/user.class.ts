import { BaseClass } from "../BaseClass/baseClass.class";

export class User extends BaseClass {
	constructor(
		private name: string,
		private email: string,
		private password: string
	) {
		super();
	}

	static init(id: string, name: string, email: string, password: string) {
		const user = new User(name, email, password);

		user.id = id;

		return user;
	}

	toJson() {
		return {
			id: this.id,
			name: this.name,
			email: this.email,
			password: this.password,
		};
	}
}

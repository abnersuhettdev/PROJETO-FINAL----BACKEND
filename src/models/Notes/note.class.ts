import { BaseClass } from "../BaseClass/baseClass.class";
import { User } from "../User/user.class";

export class Note extends BaseClass {
	constructor(
		private title: string,
		private description: string | undefined,
		private author: User,
		private arquived: boolean = false
	) {
		super();
	}

	toJson() {
		return {
			id: this.id,
			title: this.title,
			description: this.description,
			arquived: this.arquived,
			author: this.author,
		};
	}
}

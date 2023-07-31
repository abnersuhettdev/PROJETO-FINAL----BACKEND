import { BaseClass } from "../BaseClass/baseClass.class";

export class Note extends BaseClass {
	constructor(
		private title: string,
		private description: string | undefined,
		private authorId: string,
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
			authorId: this.authorId,
		};
	}
}

import { randomUUID } from "crypto";

export abstract class BaseClass {
	protected id: string;

	constructor() {
		this.id = randomUUID();
	}
}

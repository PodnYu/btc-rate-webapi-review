export class User {
	id: string | null;
	login: string;
	password: string;

	constructor(login: string, password: string, id: string | null = null) {
		this.id = id;
		this.login = login;
		this.password = password;
	}

	setId(id: string) {
		this.id = id;
	}

	setLogin(login: string) {
		this.login = login;
	}

	setPassword(password: string) {
		this.password = password;
	}

	isValid() {
		return Boolean(this.login) && Boolean(this.password);
	}

	static isValid(obj: any) {
		return new User(obj.login, obj.password).isValid();
	}

	static fromObject(obj: any) {
		return new User(obj.login, obj.password);
	}
}

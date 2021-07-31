import { IUserDTO } from '../interfaces/IUserDTO';

export class CreateUserDto implements IUserDTO {
	login: string;
	password: string;

	constructor(obj: any) {
		this.login = obj.login;
		this.password = obj.password;
	}

	isValid() {
		return Boolean(this.login) && Boolean(this.password);
	}

	static isValid(obj: any) {
		return new CreateUserDto(obj).isValid();
	}
}

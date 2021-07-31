import { IUserDTO } from '../interfaces/IUserDTO';

export class LoginUserDto implements IUserDTO {
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
		return new LoginUserDto(obj).isValid();
	}
}

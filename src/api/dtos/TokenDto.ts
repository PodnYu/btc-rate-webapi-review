export class TokenDto {
	token: string;
	message: string;

	constructor(obj: any) {
		this.token = obj.token;
		this.message = obj.message;
	}
}

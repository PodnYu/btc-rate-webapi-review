export class TokenDto {
	token: string;
	message: string;
	error: string;

	constructor(obj: any) {
		this.token = obj.token;
		this.message = obj.message;
		this.error = obj.error;
	}
}

export class ResponseDto {
	status: number;
	body: any;

	constructor(status = 200, body = {}) {
		this.status = status;
		this.body = body;
	}
}

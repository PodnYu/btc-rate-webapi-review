export class ResponseDto {
	status: number;
	body: any;

	constructor(status = 200, body = null) {
		this.status = status;
		this.body = body;
	}
}

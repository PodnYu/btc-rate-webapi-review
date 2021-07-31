export class BtcRateDto {
	sell: number;
	buy: number;

	constructor(obj: any) {
		this.sell = obj.sell;
		this.buy = obj.buy;
	}

	isValid() {
		return Boolean(this.sell) && Boolean(this.buy);
	}

	static isValid(obj: any) {
		return new BtcRateDto(obj).isValid();
	}
}

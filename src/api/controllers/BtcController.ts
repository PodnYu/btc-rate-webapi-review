import { Context } from 'koa';
import btcService from '../services/BtcService';
import { BtcRateDto } from '../dtos/BtcRateDto';

class BtcController {
	async getBtcRate(ctx: Context) {
		const userId = ctx.tokenPayload.userId;

		const result = await btcService.getBTCToUAHExchange(userId);
		ctx.status = result.status;
		ctx.body = new BtcRateDto(result.body);
	}
}

export default new BtcController();

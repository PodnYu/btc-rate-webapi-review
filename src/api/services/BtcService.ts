import { ResponseDto } from '../dtos/ResponseDto';
import userService from './UserService';
import { getBTCToUAHExchange } from '../utils/btcUtils';

class BtcService {
	getBTCToUAHExchange = async (userId: string) => {
		const response = new ResponseDto();

		if (!(await userService.userExists(userId))) {
			response.status = 403;
			response.body = { message: 'Forbidden!' };
			return response;
		}

		const btcInfo = await getBTCToUAHExchange();

		if (btcInfo === null) {
			response.status = 503;
			response.body = { message: 'Service unavailable!' };
		} else {
			response.status = 200;
			response.body = btcInfo;
		}

		return response;
	};
}

export default new BtcService();

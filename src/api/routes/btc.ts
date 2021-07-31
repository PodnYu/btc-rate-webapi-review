import KoaRouter from 'koa-router';
import btcController from '../controllers/BtcController';
import extractJWTPayload from '../middleware/extractJWTPayload';
import { exceptionCatcher } from '../utils/controllerUtils';

export default function (router: KoaRouter) {
	router.get(
		'/btcRate',
		extractJWTPayload,
		exceptionCatcher(btcController.getBtcRate)
	);
}

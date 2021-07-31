import KoaRouter from 'koa-router';
import authController from '../controllers/AuthController';
import { exceptionCatcher } from '../utils/controllerUtils';
import authMiddleware from '../middleware/AuthMiddleware';

export default function (router: KoaRouter): void {
	const urlPrefix = '/user';

	router.post(
		`${urlPrefix}/login`,
		authMiddleware.validateUserOnLogin,
		exceptionCatcher(authController.login)
	);

	router.post(
		`${urlPrefix}/create`,
		authMiddleware.validateUserOnCreate,
		exceptionCatcher(authController.create)
	);
}

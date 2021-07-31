import { Context, Next } from 'koa';
import { verifyToken } from '../utils/jwtUtils';

function getJWTToken(ctx: Context) {
	const authHeader = ctx.header.authorization;
	if (!authHeader) return null;
	const token = authHeader.split(' ')[1];
	return token || null;
}

const extractJWTPayload = async (ctx: Context, next: Next) => {
	const token = getJWTToken(ctx);
	if (token) {
		try {
			ctx.tokenPayload = await verifyToken(token);
		} catch (err) {
			console.error('Error occured while verifying token:', err.message);
			ctx.tokenPayload = null;
			ctx.status = 401;
			ctx.body = { message: 'Unauthorized, bad token!' };
			return;
		}
	} else {
		ctx.status = 403;
		ctx.body = { message: 'Forbidden, token not provided!' };
		return;
	}

	await next();
};

export default extractJWTPayload;

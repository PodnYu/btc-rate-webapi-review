import { Context } from 'koa';

export const exceptionCatcher =
	(fn: (ctx: Context) => Promise<void>) => async (ctx: Context) => {
		try {
			await fn(ctx);
		} catch (err) {
			console.error(err.message);
			ctx.status = 500;
			ctx.body = { message: 'Internal server error!' };
		}
	};

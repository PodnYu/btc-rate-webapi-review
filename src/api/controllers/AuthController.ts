import { Context } from 'koa';
import authService from '../services/AuthService';
import { TokenDto } from '../dtos/TokenDto';

class AuthController {
	async login(ctx: Context) {
		const result = await authService.login(ctx.userDto);

		ctx.status = result.status;
		ctx.body = new TokenDto(result.body);
	}

	async create(ctx: Context) {
		const result = await authService.create(ctx.userDto);

		ctx.status = result.status;
		ctx.body = new TokenDto(result.body);
	}
}

export default new AuthController();

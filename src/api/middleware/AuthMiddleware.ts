import { Context, Next } from 'koa';
import { CreateUserDto } from '../dtos/CreateUserDto';
import { LoginUserDto } from '../dtos/LoginUserDto';
import { IUserDTO } from '../interfaces/IUserDTO';

class AuthMiddleware {
	genericValidate = <DTOType extends IUserDTO>(
		c: new (obj: any) => DTOType,
		ctx: Context,
		next: Next
	) => {
		const userDto = new c(ctx.request.body);
		if (!userDto.isValid()) {
			ctx.status = 400;
			ctx.body = { message: 'Invalid login and/or password!' };
			return;
		}

		ctx.userDto = userDto;

		return next();
	};

	validateUserOnCreate = (ctx: Context, next: Next) => {
		return this.genericValidate(CreateUserDto, ctx, next);
	};

	validateUserOnLogin = (ctx: Context, next: Next) => {
		return this.genericValidate(LoginUserDto, ctx, next);
	};
}

export default new AuthMiddleware();

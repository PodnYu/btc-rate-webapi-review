import userService from '../services/UserService';
import { signToken } from '../utils/jwtUtils';
import { CreateUserDto } from '../dtos/CreateUserDto';
import { LoginUserDto } from '../dtos/LoginUserDto';
import { ResponseDto } from '../dtos/ResponseDto';
import { User } from '../models/User';

class AuthService {
	login = async (userDto: LoginUserDto) => {
		const { login, password } = userDto;
		const response = new ResponseDto();

		const user = new User(login, password);
		if (!(await userService.isUserValid(user))) {
			response.status = 404;
			response.body = { message: 'No such user' };
			return response;
		}

		const token = await signToken({ userId: user.id });

		response.status = 200;
		response.body = { token };

		return response;
	};

	create = async (userDto: CreateUserDto) => {
		const { login, password } = userDto;
		const response = new ResponseDto();

		if (await userService.isLoginAlreadyTaken(login)) {
			response.status = 403;
			response.body = { message: 'Login is already taken!' };
			return response;
		}

		const user = new User(login, password);

		const userId = await userService.createUser(user);

		if (userId === null) {
			response.status = 400;
			response.body = { error: 'Invalid request body!' };
			return response;
		}

		const token = await signToken({ userId });
		response.status = 200;
		response.body = { token };

		return response;
	};
}

export default new AuthService();

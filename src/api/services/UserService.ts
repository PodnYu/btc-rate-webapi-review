import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import fs from 'fs';
import path from 'path';
import { writeFile, readFile, readdir as readDir } from 'fs/promises';
import { User } from '../models/User';

const usersDir = path.join(__dirname, '/../../../db/users');

class UserService {
	usersDir: string;

	constructor(pathToUsersDb = usersDir) {
		const usersDirExists = fs.existsSync(pathToUsersDb);
		if (!usersDirExists) {
			fs.mkdirSync(pathToUsersDb, { recursive: true });
		}
		this.usersDir = pathToUsersDb;
	}

	private getFilePath = (userId: string) => {
		return `${this.usersDir}/${userId}.txt`;
	};

	private saveUser = async (user: User) => {
		if (user.id === null) {
			throw new Error('UserService.saveUser(): No id given!');
		}
		if (!user.isValid()) {
			throw new Error('UserService.saveUser(): Invalid user!');
		}

		// maybe here should be independent check for space characters.
		await writeFile(
			this.getFilePath(user.id),
			`${user.login} ${user.password}`
		);
	};

	private obtainUser = (userId: string) => {
		return readFile(this.getFilePath(userId), 'utf8');
	};

	// maybe createUserOrReturnNull
	createUser = async (user: User) => {
		const userId = uuidv4();
		const hashedPassword = await bcrypt.hash(
			user.password,
			parseInt(<string>process.env.SALT_ROUNDS)
		);

		const newUser = new User(user.login, hashedPassword, userId);

		if (!user.isValid()) {
			return null;
		}

		await this.saveUser(newUser);

		return userId;
	};

	getUserById = async (userId: string) => {
		try {
			const data = await this.obtainUser(userId);
			const [login, hashedPassword] = data.split(' ');

			return new User(login, hashedPassword);
		} catch (err) {
			return null;
		}
	};

	getUserByLogin = async (login: string) => {
		const users = await this.getAllUsers();
		return users.find((u) => u.login === login) || null;
	};

	isUserValid = async (u: User) => {
		const user = await this.getUserByLogin(u.login);
		if (user === null) {
			return false;
		}
		if (!user.isValid()) {
			return false;
		}
		if (user.login !== u.login) {
			return false;
		}

		const passwordOk = await bcrypt.compare(u.password, user.password);

		return passwordOk;
	};

	getAllUserIds = async () => {
		const userIds = await readDir(this.usersDir);
		return userIds.map((userId) => userId.split('.txt')[0]);
	};

	getAllUsers = async () => {
		const userIds = await this.getAllUserIds();
		const getUserPromises = [];
		for (const userId of userIds) {
			getUserPromises.push(this.getUserById(userId));
		}

		const users = await Promise.all(getUserPromises);
		return users
			.filter((u) => u !== null)
			.map((u, userIndex) => {
				const user = u as User;
				return new User(user.login, user.password, userIds[userIndex]);
			});
	};

	getAllUserLogins = async () => {
		return (await this.getAllUsers()).map((user) => user.login);
	};

	isLoginAlreadyTaken = async (login: string) => {
		return (await this.getAllUserLogins()).some((l) => l === login);
	};

	deleteUserById = async (userId: string) => {
		try {
			await fs.promises.unlink(this.getFilePath(userId));
		} catch (_) {
			console.error('failed to delete user');
		}
	};

	/*
		Looks like it is faster to remove entire db/users directory and recreate it
			or
		to execute shell command `rm -rf ${path.join(this.usersDir, '*')}` (sounds not very nice)
	*/
	deleteAllUsers = async () => {
		const userIds = await this.getAllUserIds();
		await Promise.all(userIds.map((userId) => this.deleteUserById(userId)));
	};

	userExists = async (userId: string) => {
		try {
			await fs.promises.access(this.getFilePath(userId), fs.constants.F_OK);
			return true;
		} catch (err) {
			return false;
		}
	};
}

export default new UserService();

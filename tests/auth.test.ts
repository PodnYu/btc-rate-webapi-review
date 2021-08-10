import chai from 'chai';
import chaiHttp from 'chai-http';
import userService from '../src/api/services/UserService';
import dotenv from 'dotenv';
dotenv.config();
import app from '../src/app';
import { User } from '../src/api/models/User';

chai.use(chaiHttp);
const expect = chai.expect;
const server = app.listen();

describe('Auth testing', () => {
	beforeEach(async () => {
		await userService.deleteAllUsers();
	});

	after(async () => {
		await userService.deleteAllUsers();
		server.close();
	});

	it('should create new user and return token', async () => {
		const response = await chai
			.request(server)
			.post('/user/create')
			.send({ login: 'test', password: 'test' });

		expect(response.status).to.be.equal(200);
		expect(response.body).to.have.property('token');
	});

	it('should get 403 because user already exists', async () => {
		const user = new User('test', 'test');
		await userService.createUser(user);
		const response = await chai
			.request(server)
			.post('/user/create')
			.send({ login: user.login, password: user.password });

		expect(response.status).to.be.equal(403);
	});

	it('should get 400 because of bad login', async () => {
		const user = new User('tes t', 'test');
		await userService.createUser(user);
		const response = await chai
			.request(server)
			.post('/user/create')
			.send({ login: user.login, password: user.password });

		expect(response.status).to.be.equal(400);
		expect(response.body).to.have.property('error');
	});

	it('should login successfully and return token', async () => {
		const user = new User('test', 'test');
		await userService.createUser(user);
		const response = await chai
			.request(server)
			.post('/user/login')
			.send({ login: 'test', password: 'test' });

		expect(response.status).to.be.equal(200);
		expect(response.body).to.have.property('token');
	});

	it('should NOT login successfully and return 404 status code', async () => {
		const user = new User('test', 'test');
		await userService.createUser(user);

		let response = await chai
			.request(server)
			.post('/user/login')
			.send({ login: 'testb', password: 'test' });

		expect(response.status).to.be.equal(404);

		response = await chai
			.request(server)
			.post('/user/login')
			.send({ login: 'test', password: 'testb' });

		expect(response.status).to.be.equal(404);
	});

	it('should get 400 status code', async () => {
		let response = await chai
			.request(server)
			.post('/user/create')
			.send({ login: '', password: 'test' });

		expect(response.status).to.be.equal(400);

		response = await chai
			.request(server)
			.post('/user/login')
			.send({ login: 'test', password: '' });

		expect(response.status).to.be.equal(400);
	});
});

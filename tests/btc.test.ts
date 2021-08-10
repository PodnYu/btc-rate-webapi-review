import chai from 'chai';
import chaiHttp from 'chai-http';
import userService from '../src/api/services/UserService';
import dotenv from 'dotenv';
dotenv.config();
import app from '../src/app';

chai.use(chaiHttp);
const expect = chai.expect;
const server = app.listen();

describe('BTC testing', () => {
	beforeEach(async () => {
		await userService.deleteAllUsers();
	});

	after(async () => {
		await userService.deleteAllUsers();
		server.close();
	});

	it('should get btcRate and return 200 status code', async () => {
		const authResponse = await chai
			.request(server)
			.post('/user/create')
			.send({ login: 'test', password: 'test' });

		const token = authResponse.body.token;

		const response = await chai
			.request(server)
			.get('/btcRate')
			.set('Authorization', `Bearer ${token}`);

		expect(response.status).to.be.equal(200);
		expect(response.body).to.have.property('buy');
		expect(response.body).to.have.property('sell');
	});

	it('should NOT get btcRate and return 403 status code', async () => {
		const response = await chai.request(server).get('/btcRate');

		expect(response.status).to.be.equal(403);
	});
});

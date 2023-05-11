import * as chai from 'chai';
import * as sinon from 'sinon';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import UserModel from '../database/models/UserModel';
import { user, jwtValidate } from './mocks/loginMock';
import * as bcrypty from 'bcryptjs';
import * as jwt from 'jsonwebtoken';

chai.use(chaiHttp);

const { expect } = chai;

describe('Login Router', () => {
  afterEach(() => {
    sinon.restore();
  });

  describe('POST /login', () => {
    describe('Feita a chamada sem email ou password', () => {
      it('Deve retornar 400 e uma mensagem', async () => {
        const response = await chai.request(app).post('/login');

        expect(response.status).to.be.equal(400);
        expect(response.body).to.be.deep.equal({ message: 'All fields must be filled' });
      });
    });

    describe('Feita a chamada com um email ou senha inexistente', () => {
      it('Deve retornar 401 e uma mensagem', async () => {
        sinon.stub(UserModel, 'findOne').resolves(undefined);

        const response = await chai.request(app)
          .post('/login')
          .send({
            email: 'test@bla.com',
            password: '1234567'
          });

        expect(response.status).to.be.equal(401);
        expect(response.body).to.be.deep.equal({ message: 'Invalid email or password' });
      });

      it('Deve retornar 401 e uma mensagem', async () => {
        sinon.stub(UserModel, 'findOne').resolves(user as UserModel);

        const response = await chai.request(app)
          .post('/login')
          .send({
            email: user.email,
            password: '1234567'
          });

        expect(response.status).to.be.equal(401);
        expect(response.body).to.be.deep.equal({ message: 'Invalid email or password' });
      });
    });

    describe('Feita a chamada com um email e senhas válidos', () => {
      it('Deve retornar 200 e um token', async () => {
        sinon.stub(UserModel, 'findOne').resolves(user as UserModel);
        sinon.stub(bcrypty, 'compareSync').resolves(user.password);

        const response = await chai.request(app)
          .post('/login').send({
            email: user.email,
            password: user.password
          });

        expect(response.status).to.be.equal(200);
        expect(response.body).not.to.be.empty;
      });
    });
  });

  describe('GET /login/role', () => {
    describe('Feita a chamada sem um token', () => {
      it('Deve retornar 401 e uma mensagem', async () => {
        const response = await chai.request(app).get('/login/role');

        expect(response.status).to.be.equal(401);
        expect(response.body).to.be.deep.equal({ message: 'Token not found' });
      });
    });

    describe('Feita a chamada com um token inválido', () => {
      it('Deve retornar 401 e uma mensagem', async () => {
        sinon.stub(jwt, 'verify').throws(new Error('Token inválido'));

        const response = await chai.request(app).get('/login/role').set('Authorization', 'token-invalid');

        expect(response.status).to.be.equal(401);
        expect(response.body).to.be.deep.equal({ message: 'Token must be a valid token' });
      });
    });

    describe('Feita a chamada com um token válido', () => {
      it('Deve retornar 200 e a role do usuário', async () => {
        sinon.stub(jwt, 'verify').callsFake(() => jwtValidate);

        const response = await chai.request(app).get('/login/role').set('Authorization', 'token-valid');

        expect(response.status).to.be.equal(200);
        expect(response.body).to.be.deep.equal({ role: jwtValidate.role });
      });
    });
  });
});
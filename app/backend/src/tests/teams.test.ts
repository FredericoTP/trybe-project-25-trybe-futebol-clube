import * as chai from 'chai';
import * as sinon from 'sinon';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import { teams } from './mocks/teamsMock';
import TeamModel from '../database/models/TeamModel';

chai.use(chaiHttp);

const { expect } = chai;

describe('Team Router', () => {
  afterEach(() => {
    sinon.restore();
  });

  describe('GET /teams', () => {
    describe('Feita a chamada', () => {
      it('Deve retornar 200 e a lista de times', async () => {
        sinon.stub(TeamModel, 'findAll').resolves(teams as TeamModel[]);

        const response = await chai.request(app).get('/teams');

        expect(response.status).to.be.equal(200);
        expect(response.body).to.be.deep.equal(teams);
      });
    });
  });

  describe('GET /teams/:id', () => {
    describe('Feita a chamada com id inválido', () => {
      it('Deve retornar 404 e uma mensagem', async () => {
        sinon.stub(TeamModel, 'findOne').resolves(undefined);

        const response = await chai.request(app).get('/teams/900');

        expect(response.status).to.be.equal(404);
        expect(response.body).to.be.deep.equal({ message: 'Team does not exist' });
      })
    });
    describe('Feita a chamada com id válido', () => {
      it('Deve retornar 200 e o time específico', async () => {
        sinon.stub(TeamModel, 'findOne').resolves(teams[1] as TeamModel);

        const response = await chai.request(app).get('/teams/1');

        expect(response.status).to.be.equal(200);
        expect(response.body).to.be.deep.equal(teams[1]);
      })
    });
  });
});
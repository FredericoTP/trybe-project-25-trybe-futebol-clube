import * as chai from 'chai';
import * as sinon from 'sinon';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import MatchModel from '../database/models/MatchModel';
import {
  matchesList,
  matchesInProgress,
  matchesFinished,
  newMatchFail,
  newMatch,
  successTeam1,
  successTeam2,
  upGoals
} from './mocks/matchMokes';
import * as jwt from 'jsonwebtoken';
import { jwtValidate } from './mocks/loginMock';
import TeamModel from '../database/models/TeamModel';

chai.use(chaiHttp);

const { expect } = chai;

describe('Match Router', () => {
  afterEach(() => {
    sinon.restore();
  });

  describe('GET /matches', () => {
    describe('Feita a chamada sem especificar inProgress', () => {
      it('Deve retornar 200 e uma lista das matches', async () => {
        sinon.stub(MatchModel, 'findAll').resolves(matchesList as MatchModel[]);

        const response = await chai.request(app).get('/matches');

        expect(response.status).to.be.equal(200);
        expect(response.body).to.be.deep.equal(matchesList);
      });
    });

    describe('Feita a chamada para partidas em adamento', () => {
      it('Deve retornar 200 e uma lista das matches', async () => {
        sinon.stub(MatchModel, 'findAll').resolves(matchesInProgress as MatchModel[]);

        const response = await chai.request(app).get('/matches')
          .query({ inProgress: 'true' });

        expect(response.status).to.be.equal(200);
        expect(response.body).to.be.deep.equal(matchesInProgress);
      });
    });

    describe('Feita a chamada para partidas concluídas', () => {
      it('Deve retornar 200 e uma lista das matches', async () => {
        sinon.stub(MatchModel, 'findAll').resolves(matchesFinished as MatchModel[]);

        const response = await chai.request(app).get('/matches')
          .query({ inProgress: 'true' });

        expect(response.status).to.be.equal(200);
        expect(response.body).to.be.deep.equal(matchesFinished);
      });
    });
  });

  describe('POST /matches', () => {
    describe('Feita a chamada para adicionar uma partida', () => {
      it('Deve retornar 400 e uma mensagem caso não seja passado os paramêtros obrigatórios', async () => {
        sinon.stub(jwt, 'verify').callsFake(() => jwtValidate);

        const response = await chai.request(app).post('/matches').set('Authorization', 'token-valid');

        expect(response.status).to.be.equal(400);
        expect(response.body).to.be.deep.equal({ message: 'All fields must be filled' });
      });

      it('Deve retornar 422 e uma mensagem caso seja passado dois times iguais', async () => {
        sinon.stub(jwt, 'verify').callsFake(() => jwtValidate);

        const response = await chai.request(app).post('/matches')
          .set('Authorization', 'token-valid')
          .send(newMatchFail);

        expect(response.status).to.be.equal(422);
        expect(response.body).to.be.deep.equal({ message: 'It is not possible to create a match with two equal teams' });
      });
    });

    describe('Feita a chamada corretamente', () => {
      it('Deve retornar 404 e uma mensagem caso não exista algum dos times passados', async () => {
        sinon.stub(jwt, 'verify').callsFake(() => jwtValidate);
        sinon.stub(TeamModel, 'findOne')
          .onFirstCall().resolves(successTeam1.message as TeamModel)
          .onSecondCall().resolves(undefined);

        const response = await chai.request(app).post('/matches')
          .set('Authorization', 'token-valid')
          .send(newMatch);

        expect(response.status).to.be.equal(404);
        expect(response.body).to.be.deep.equal({ message: 'There is no team with such id!' });
      });

      it('Deve retornar 201 e o novo time criado', async () => {
        sinon.stub(jwt, 'verify').callsFake(() => jwtValidate);
        sinon.stub(TeamModel, 'findOne')
          .onFirstCall().resolves(successTeam1.message as TeamModel)
          .onSecondCall().resolves(successTeam2.message as TeamModel);
        sinon.stub(MatchModel, 'create').resolves(newMatch as MatchModel);

        const response = await chai.request(app).post('/matches')
          .set('Authorization', 'token-valid')
          .send(newMatch);

        expect(response.status).to.be.equal(201);
        expect(response.body).to.be.deep.equal(newMatch);
      });
    });
  });

  describe('PATCH /matches/:id/finish', () => {
    describe('Feita a chamada com um id inexistente', () => {
      it('Deve retornar 404 e uma mensagem', async () => {
        sinon.stub(jwt, 'verify').callsFake(() => jwtValidate);
        sinon.stub(MatchModel, 'findOne').resolves(undefined);

        const response = await chai.request(app).patch('/matches/60/finish')
          .set('Authorization', 'token-valid');

        expect(response.status).to.be.equal(404);
        expect(response.body).to.be.deep.equal({ message: 'Team does not exist' });
      });
    });

    describe('Feita a chamada corretamente', () => {
      it('Deve retornar 200 e uma mensagem', async () => {
        sinon.stub(jwt, 'verify').callsFake(() => jwtValidate);
        sinon.stub(MatchModel, 'findOne').resolves(matchesList[1] as MatchModel);
        sinon.stub(MatchModel, 'update').resolves([1]);

        const response = await chai.request(app).patch('/matches/6/finish')
          .set('Authorization', 'token-valid');

        expect(response.status).to.be.equal(200);
        expect(response.body).to.be.deep.equal({ message: 'Finished' });
      });
    });
  });

  describe('PATCH /matches/:id', () => {
    describe('Feita a chamada incorretamente', () => {
      it('Deve retornar 400 e uma mensagem', async () => {
        sinon.stub(jwt, 'verify').callsFake(() => jwtValidate);

        const response = await chai.request(app).patch('/matches/6')
          .set('Authorization', 'token-valid');

        expect(response.status).to.be.equal(400);
        expect(response.body).to.be.deep.equal({ message: 'All fields must be filled' });
      });
    });

    describe('Feita a chamada corretamente', () => {
      it('Deve retornar 200 e uma mensagem', async () => {
        sinon.stub(jwt, 'verify').callsFake(() => jwtValidate);
        sinon.stub(MatchModel, 'findOne').resolves(matchesList[1] as MatchModel);
        sinon.stub(MatchModel, 'update').resolves([1]);

        const response = await chai.request(app).patch('/matches/6')
          .set('Authorization', 'token-valid')
          .send(upGoals);

        expect(response.status).to.be.equal(200);
        expect(response.body).to.be.deep.equal({ message: 'Updated' });
      });
    });
  });
});
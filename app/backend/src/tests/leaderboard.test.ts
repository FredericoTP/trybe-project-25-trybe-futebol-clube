import * as chai from 'chai';
import * as sinon from 'sinon';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import {
  teams,
  firstHomeList,
  secondHomeList,
  thirdHomeList,
  homeTable,
  firstAwayList,
  secondAwayList,
  thirdAwayList,
  awayTable,
  leaderboardTable
} from './mocks/leaderboardMock';
import TeamModel from '../database/models/TeamModel';
import MatchModel from '../database/models/MatchModel';

chai.use(chaiHttp);

const { expect } = chai;

describe('Leaderboard Router', () => {
  afterEach(() => {
    sinon.restore();
  });

  describe('GET /leaderboard/home', () => {
    describe('Feita a chamada', () => {
      it('Deve retornar 200 e a tabale de classificação por jogos em casa', async () => {
        sinon.stub(TeamModel, 'findAll').resolves(teams as TeamModel[]);
        sinon.stub(MatchModel, 'findAll')
          .onFirstCall().resolves(firstHomeList as MatchModel[])
          .onSecondCall().resolves(secondHomeList as MatchModel[])
          .onThirdCall().resolves(thirdHomeList as MatchModel[]);

        const response = await chai.request(app).get('/leaderboard/home');

        expect(response.status).to.be.equal(200);
        expect(response.body).to.be.deep.equal(homeTable);
      });
    });
  });

  describe('GET /leaderboard/away', () => {
    describe('Feita a chamada', () => {
      it('Deve retornar 200 e a tabale de classificação por jogos fora de casa', async () => {
        sinon.stub(TeamModel, 'findAll').resolves(teams as TeamModel[]);
        sinon.stub(MatchModel, 'findAll')
          .onFirstCall().resolves(firstAwayList as MatchModel[])
          .onSecondCall().resolves(secondAwayList as MatchModel[])
          .onThirdCall().resolves(thirdAwayList as MatchModel[]);

        const response = await chai.request(app).get('/leaderboard/away');

        expect(response.status).to.be.equal(200);
        expect(response.body).to.be.deep.equal(awayTable);
      });
    });
  });

  describe('GET /leaderboard', () => {
    describe('Feita a chamada', () => {
      it('Deve retornar 200 e a tabale de classificação por jogos fora de casa', async () => {
        sinon.stub(TeamModel, 'findAll').resolves(teams as TeamModel[]);
        sinon.stub(MatchModel, 'findAll')
          .onCall(1).resolves(firstHomeList as MatchModel[])
          .onCall(2).resolves(firstAwayList as MatchModel[])
          .onCall(3).resolves(secondHomeList as MatchModel[])
          .onCall(4).resolves(secondAwayList as MatchModel[])
          .onCall(5).resolves(thirdHomeList as MatchModel[])
          .onCall(6).resolves(thirdAwayList as MatchModel[]);

        const response = await chai.request(app).get('/leaderboard');

        expect(response.status).to.be.equal(200);
        expect(response.body).to.be.deep.equal(leaderboardTable);
      });
    })
  })
});
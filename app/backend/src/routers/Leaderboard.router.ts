import { Router } from 'express';
import { LeaderboardController } from '../controllers';

const leaderboardRouter = Router();

leaderboardRouter.get('/home', LeaderboardController.getleaderBoard);

export default leaderboardRouter;

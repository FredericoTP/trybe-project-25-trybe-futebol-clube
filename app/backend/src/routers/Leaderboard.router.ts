import { Router } from 'express';
import { LeaderboardController } from '../controllers';

const leaderboardRouter = Router();

leaderboardRouter.get('/', LeaderboardController.getLeaderboard);

leaderboardRouter.get('/home', LeaderboardController.getLeaderBoardHome);

leaderboardRouter.get('/away', LeaderboardController.getLeaderBoardAway);

export default leaderboardRouter;

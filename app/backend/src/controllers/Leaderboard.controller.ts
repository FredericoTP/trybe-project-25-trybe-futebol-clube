import { Response, Request } from 'express';
import { LeaderboardService } from '../services';
import { mapError } from '../utils/errorMap';

class LeaderboardController {
  public static async getLeaderBoardHome(_req: Request, res: Response) {
    const { type, message } = await LeaderboardService.getLeaderBoardHome();

    if (type) return res.status(mapError(type)).json({ message });

    return res.status(200).json(message);
  }

  public static async getLeaderBoardAway(_req: Request, res: Response) {
    const { type, message } = await LeaderboardService.getLeaderBoardAway();

    if (type) return res.status(mapError(type)).json({ message });

    return res.status(200).json(message);
  }

  public static async getLeaderboard(_req: Request, res: Response) {
    const { type, message } = await LeaderboardService.getLeaderboard();

    if (type) return res.status(mapError(type)).json({ message });

    return res.status(200).json(message);
  }
}

export default LeaderboardController;

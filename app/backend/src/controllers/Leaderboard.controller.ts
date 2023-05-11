import { Response, Request } from 'express';
import { LeaderboardService } from '../services';
import { mapError } from '../utils/errorMap';

class LeaderboardController {
  public static async getleaderBoard(_req: Request, res: Response) {
    const { type, message } = await LeaderboardService.getleaderBoard();

    if (type) return res.status(mapError(type)).json({ message });

    return res.status(200).json(message);
  }
}

export default LeaderboardController;

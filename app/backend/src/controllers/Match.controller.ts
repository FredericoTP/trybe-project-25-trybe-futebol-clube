import { Response, Request } from 'express';
import { MatchService } from '../services';
import { mapError } from '../utils/errorMap';

class MatchController {
  public static async getAll(req: Request, res: Response) {
    const progress = req.query.inProgress as string;

    if (progress !== 'false' && progress !== 'true') {
      const { type, message } = await MatchService.getAll();

      if (type) return res.status(mapError(type)).json({ message });

      return res.status(200).json(message);
    }

    const { type, message } = await MatchService.getAllSorted(progress === 'true' ? 1 : 0);

    if (type) return res.status(mapError(type)).json({ message });

    return res.status(200).json(message);
  }

  public static async update(req: Request, res: Response) {
    const { id } = req.params;

    const { type, message } = await MatchService.update(+id);

    if (type) return res.status(mapError(type)).json({ message });

    return res.status(200).json({ message });
  }

  public static async updateGoals(req: Request, res: Response) {
    const { id } = req.params;
    const { awayTeamGoals, homeTeamGoals } = req.body;

    const { type, message } = await MatchService.updateGoals(+id, { awayTeamGoals, homeTeamGoals });

    if (type) return res.status(mapError(type)).json({ message });

    return res.status(200).json({ message });
  }
}

export default MatchController;

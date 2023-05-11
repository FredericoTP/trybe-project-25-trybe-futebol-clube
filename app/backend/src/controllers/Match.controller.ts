import { Response, Request } from 'express';
import { MatchService } from '../services';
import { mapError } from '../utils/errorMap';

class MatchController {
  public static async getAll(_req: Request, res: Response) {
    const { type, message } = await MatchService.getAll();

    if (type) return res.status(mapError(type)).json({ message });

    return res.status(200).json(message);
  }
}

export default MatchController;

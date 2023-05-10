import { Response, Request } from 'express';
import TeamService from '../services';
import { mapError } from '../utils/errorMap';

class TeamController {
  teamService: TeamService;

  constructor(teamService = new TeamService()) {
    this.teamService = teamService;
  }

  public static async getAll(_req: Request, res: Response) {
    const { type, message } = await TeamService.getAll();

    if (type) return res.status(mapError(type)).json({ message });

    return res.status(200).json(message);
  }

  public static async getById(req: Request, res: Response) {
    const { id } = req.params;

    const { type, message } = await TeamService.getById(+id);

    if (type) return res.status(mapError(type)).json({ message });

    return res.status(200).json(message);
  }
}

export default TeamController;

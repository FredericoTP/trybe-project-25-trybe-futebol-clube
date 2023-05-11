import TeamModel from '../database/models/TeamModel';
import { validateId } from './validations/validationInputValues';

class TeamService {
  public static async getAll() {
    const teams = await TeamModel.findAll();

    return { type: null, message: teams };
  }

  public static async getById(id: number) {
    const error = validateId(id);
    if (error.type) return error;

    const team = await TeamModel.findOne({
      where: { id },
    });

    if (!team) return { type: 'teamNotFound', message: 'Team does not exist' };

    return { type: null, message: team };
  }
}

export default TeamService;

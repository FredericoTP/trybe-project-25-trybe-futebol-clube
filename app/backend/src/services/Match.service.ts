import MatchModel from '../database/models/MatchModel';
import TeamModel from '../database/models/TeamModel';

class MatchService {
  public static async getAll() {
    const teams = await MatchModel.findAll({
      include: [
        {
          model: TeamModel,
          as: 'homeTeam',
          attributes: { exclude: ['id'] },
        },
        {
          model: TeamModel,
          as: 'awayTeam',
          attributes: { exclude: ['id'] },
        }],
    });

    return { type: null, message: teams };
  }
}

export default MatchService;

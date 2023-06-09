import MatchModel from '../database/models/MatchModel';
import TeamModel from '../database/models/TeamModel';
import TeamService from './Team.service';
import { validateId, validateGoalsFields } from './validations/validationInputValues';
import Goals, { newTeam } from '../interfaces/MatchInterface';

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

  public static async getAllSorted(progress: number) {
    const matches = await MatchModel.findAll({
      where: { inProgress: progress },
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

    return { type: null, message: matches };
  }

  public static async findById(id: number) {
    const error = validateId(id);
    if (error.type) return error;

    const match = await MatchModel.findOne({
      where: { id },
    });

    if (!match) return { type: 'matchNotFound', message: 'Team does not exist' };

    return { type: null, message: match };
  }

  public static async update(id: number) {
    const match = await MatchService.findById(id);

    if (match.type) return match;

    await MatchModel.update({ inProgress: false }, { where: { id } });

    return { type: null, message: 'Finished' };
  }

  public static async updateGoals(id: number, body: Goals) {
    const error = validateGoalsFields(body);
    if (error.type) return error;

    const match = await MatchService.findById(id);

    if (match.type) return match;

    const { homeTeamGoals, awayTeamGoals } = body;

    await MatchModel.update({ homeTeamGoals, awayTeamGoals }, { where: { id } });

    return { type: null, message: 'Updated' };
  }

  private static async checkTeamExists(homeTeamId: number, awayTeamId: number): Promise<boolean> {
    const homeTeam = await TeamService.getById(homeTeamId);
    const awayTeam = await TeamService.getById(awayTeamId);

    if (homeTeam.type || awayTeam.type) {
      return false;
    }

    return true;
  }

  public static async addMatch(match: newTeam) {
    const { homeTeamId, homeTeamGoals, awayTeamId, awayTeamGoals } = match;

    const isValid = await MatchService.checkTeamExists(homeTeamId, awayTeamId);

    if (!isValid) return { type: 'teamNotFound', message: 'There is no team with such id!' };

    const newMatch = await MatchModel.create(
      { homeTeamId, homeTeamGoals, awayTeamId, awayTeamGoals },
    );

    return { type: null, message: newMatch };
  }

  public static async findByHomeId(id: number) {
    const match = await MatchModel.findAll({
      where: { homeTeamId: id, inProgress: false },
    });

    if (!match) return { type: 'matchNotFound', message: [] };

    return { type: null, message: match };
  }

  public static async findByAwayId(id: number) {
    const match = await MatchModel.findAll({
      where: { awayTeamId: id, inProgress: false },
    });

    if (!match) return { type: 'matchNotFound', message: [] };

    return { type: null, message: match };
  }
}

export default MatchService;

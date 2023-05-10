import TeamModel from '../database/models/TeamModel';

class TeamService {
  public static async getAll() {
    const teams = await TeamModel.findAll();

    return { type: null, message: teams };
  }
}

export default TeamService;

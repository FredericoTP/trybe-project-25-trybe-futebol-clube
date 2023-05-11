import TeamService from './Team.service';
import MatchService from './Match.service';
import HandleLeaderboard from '../utils/handleLeaderboard';

class LeaderboardService {
  public static async getleaderBoard() {
    const { message: teams } = await TeamService.getAll();

    const homeMatches = await Promise.all(teams.map(async (team) => {
      const { message: matches } = await MatchService.findByHomeId(team.id);

      return HandleLeaderboard.matchStatus(team.teamName, matches);
    }));

    const sorted = HandleLeaderboard.sortMatches(homeMatches);

    return { type: null, message: sorted };
  }
}

export default LeaderboardService;

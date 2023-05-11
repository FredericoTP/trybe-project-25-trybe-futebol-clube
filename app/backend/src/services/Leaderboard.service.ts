import TeamService from './Team.service';
import MatchService from './Match.service';
import HandleLeaderboardHome from '../utils/handleLeaderboardHome';
import HandleLeaderboardAway from '../utils/handleLeaderboardAway';

class LeaderboardService {
  public static async getLeaderBoardHome() {
    const { message: teams } = await TeamService.getAll();

    const homeMatches = await Promise.all(teams.map(async (team) => {
      const { message: matches } = await MatchService.findByHomeId(team.id);

      return HandleLeaderboardHome.matchStatus(team.teamName, matches);
    }));

    const sorted = HandleLeaderboardHome.sortMatches(homeMatches);

    return { type: null, message: sorted };
  }

  public static async getLeaderBoardAway() {
    const { message: teams } = await TeamService.getAll();

    const awayMatches = await Promise.all(teams.map(async (team) => {
      const { message: matches } = await MatchService.findByAwayId(team.id);

      return HandleLeaderboardAway.matchStatus(team.teamName, matches);
    }));

    const sorted = HandleLeaderboardAway.sortMatches(awayMatches);

    return { type: null, message: sorted };
  }
}

export default LeaderboardService;

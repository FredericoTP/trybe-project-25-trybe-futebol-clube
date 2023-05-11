import TeamService from './Team.service';
import MatchService from './Match.service';
import HandleLeaderboardHome from '../utils/handleLeaderboardHome';
import HandleLeaderboardAway from '../utils/handleLeaderboardAway';
import HandleLeaderboard from '../utils/handleLeaderboard';

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

  public static async getLeaderboard() {
    const { message: teams } = await TeamService.getAll();

    const allMatches = await Promise.all(teams.map(async (team) => {
      const { message: homeMatches } = await MatchService.findByHomeId(team.id);

      const { message: awayMatches } = await MatchService.findByAwayId(team.id);

      return HandleLeaderboard.matchStatus(team.teamName, awayMatches, homeMatches);
    }));

    const sorted = HandleLeaderboardAway.sortMatches(allMatches);

    return { type: null, message: sorted };
  }
}

export default LeaderboardService;

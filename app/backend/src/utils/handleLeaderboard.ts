import { Matches, GoalsCount } from '../interfaces/LeaderboardInterface';

class HandleLeaderboard {
  public static matchStatus(name:string, matches: Matches[]) {
    const goalsCount = HandleLeaderboard.goalsCount(matches);

    return {
      name,
      totalPoints: HandleLeaderboard.totalPoints(matches),
      totalGames: matches.length,
      totalVictories: HandleLeaderboard.totalVictories(matches),
      totalDraws: HandleLeaderboard.totalDraws(matches),
      totalLosses: HandleLeaderboard.totalLosses(matches),
      goalsFavor: goalsCount.favor,
      goalsOwn: goalsCount.own,
      goalsBalance: goalsCount.balance,
      efficiency: HandleLeaderboard.efficiency(matches),
    };
  }

  public static totalPoints(matches: Matches[]): number {
    return matches.reduce((acc, cur) => {
      if (cur.homeTeamGoals > cur.awayTeamGoals) {
        return acc + 3;
      }
      if (cur.homeTeamGoals === cur.awayTeamGoals) {
        return acc + 1;
      }

      return acc;
    }, 0);
  }

  public static totalVictories(matches: Matches[]): number {
    return matches.reduce((acc, cur) => {
      if (cur.homeTeamGoals > cur.awayTeamGoals) {
        return acc + 1;
      }

      return acc;
    }, 0);
  }

  public static totalDraws(matches: Matches[]): number {
    return matches.reduce((acc, cur) => {
      if (cur.homeTeamGoals === cur.awayTeamGoals) {
        return acc + 1;
      }

      return acc;
    }, 0);
  }

  public static totalLosses(matches: Matches[]): number {
    return matches.reduce((acc, cur) => {
      if (cur.homeTeamGoals < cur.awayTeamGoals) {
        return acc + 1;
      }

      return acc;
    }, 0);
  }

  public static goalsCount(matches: Matches[]): GoalsCount {
    const favor = matches.reduce((acc, cur) => acc + cur.homeTeamGoals, 0);
    const own = matches.reduce((acc, cur) => acc + cur.awayTeamGoals, 0);
    const balance = favor - own;

    return { favor, own, balance };
  }

  public static efficiency(matches: Matches[]): number {
    const totalPoints = HandleLeaderboard.totalPoints(matches);
    const totalGames = matches.length;

    return +((totalPoints / (totalGames * 3)) * 100).toFixed(2);
  }
}

export default HandleLeaderboard;

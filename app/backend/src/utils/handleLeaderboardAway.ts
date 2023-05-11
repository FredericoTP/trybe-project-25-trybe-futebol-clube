import { Matches, GoalsCount, Leaderboard } from '../interfaces/LeaderboardInterface';

class HandleLeaderboardAway {
  public static matchStatus(name:string, matches: Matches[]) {
    const goalsCount = HandleLeaderboardAway.goalsCount(matches);

    return {
      name,
      totalPoints: HandleLeaderboardAway.totalPoints(matches),
      totalGames: matches.length,
      totalVictories: HandleLeaderboardAway.totalVictories(matches),
      totalDraws: HandleLeaderboardAway.totalDraws(matches),
      totalLosses: HandleLeaderboardAway.totalLosses(matches),
      goalsFavor: goalsCount.favor,
      goalsOwn: goalsCount.own,
      goalsBalance: goalsCount.balance,
      efficiency: HandleLeaderboardAway.efficiency(matches),
    };
  }

  public static totalPoints(matches: Matches[]): number {
    return matches.reduce((acc, cur) => {
      if (cur.awayTeamGoals > cur.homeTeamGoals) {
        return acc + 3;
      }
      if (cur.awayTeamGoals === cur.homeTeamGoals) {
        return acc + 1;
      }

      return acc;
    }, 0);
  }

  public static totalVictories(matches: Matches[]): number {
    return matches.reduce((acc, cur) => {
      if (cur.awayTeamGoals > cur.homeTeamGoals) {
        return acc + 1;
      }

      return acc;
    }, 0);
  }

  public static totalDraws(matches: Matches[]): number {
    return matches.reduce((acc, cur) => {
      if (cur.awayTeamGoals === cur.homeTeamGoals) {
        return acc + 1;
      }

      return acc;
    }, 0);
  }

  public static totalLosses(matches: Matches[]): number {
    return matches.reduce((acc, cur) => {
      if (cur.awayTeamGoals < cur.homeTeamGoals) {
        return acc + 1;
      }

      return acc;
    }, 0);
  }

  public static goalsCount(matches: Matches[]): GoalsCount {
    const favor = matches.reduce((acc, cur) => acc + cur.awayTeamGoals, 0);
    const own = matches.reduce((acc, cur) => acc + cur.homeTeamGoals, 0);
    const balance = favor - own;

    return { favor, own, balance };
  }

  public static efficiency(matches: Matches[]): number {
    const totalPoints = HandleLeaderboardAway.totalPoints(matches);
    const totalGames = matches.length;

    return +((totalPoints / (totalGames * 3)) * 100).toFixed(2);
  }

  public static sortMatches(matches: Leaderboard[]) {
    return matches.sort((a, b) => {
      if (a.totalPoints > b.totalPoints) {
        return -1;
      } if (a.totalPoints < b.totalPoints) {
        return 1;
      }

      if (a.goalsBalance > b.goalsBalance) {
        return -1;
      } if (a.goalsBalance < b.goalsBalance) {
        return 1;
      }

      if (a.goalsFavor > b.goalsFavor) {
        return -1;
      } if (a.goalsFavor < b.goalsFavor) {
        return 1;
      }

      return 0;
    });
  }
}

export default HandleLeaderboardAway;

import { Matches, GoalsCount, Leaderboard } from '../interfaces/LeaderboardInterface';

class HandleLeaderboardHome {
  public static matchStatus(name:string, matches: Matches[]) {
    const goalsCount = HandleLeaderboardHome.goalsCount(matches);

    return {
      name,
      totalPoints: HandleLeaderboardHome.totalPoints(matches),
      totalGames: matches.length,
      totalVictories: HandleLeaderboardHome.totalVictories(matches),
      totalDraws: HandleLeaderboardHome.totalDraws(matches),
      totalLosses: HandleLeaderboardHome.totalLosses(matches),
      goalsFavor: goalsCount.favor,
      goalsOwn: goalsCount.own,
      goalsBalance: goalsCount.balance,
      efficiency: HandleLeaderboardHome.efficiency(matches),
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
    const totalPoints = HandleLeaderboardHome.totalPoints(matches);
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

export default HandleLeaderboardHome;

import { Matches, GoalsCount, Leaderboard } from '../interfaces/LeaderboardInterface';
import HandleLeaderboardAway from './handleLeaderboardAway';
import HandleLeaderboardHome from './handleLeaderboardHome';

class HandleLeaderboard {
  public static matchStatus(name:string, awayMatches: Matches[], homeMatches: Matches[]) {
    const goalsCount = HandleLeaderboard.goalsCount(awayMatches, homeMatches);

    return {
      name,
      totalPoints: HandleLeaderboard.totalPoints(awayMatches, homeMatches),
      totalGames: awayMatches.length + homeMatches.length,
      totalVictories: HandleLeaderboard.totalVictories(awayMatches, homeMatches),
      totalDraws: HandleLeaderboard.totalDraws(awayMatches, homeMatches),
      totalLosses: HandleLeaderboard.totalLosses(awayMatches, homeMatches),
      goalsFavor: goalsCount.favor,
      goalsOwn: goalsCount.own,
      goalsBalance: goalsCount.balance,
      efficiency: HandleLeaderboard.efficiency(awayMatches, homeMatches),
    };
  }

  public static totalPoints(awayMatches: Matches[], homeMatches: Matches[]): number {
    const away = HandleLeaderboardAway.totalPoints(awayMatches);

    const home = HandleLeaderboardHome.totalPoints(homeMatches);

    return away + home;
  }

  public static totalVictories(awayMatches: Matches[], homeMatches: Matches[]): number {
    const away = HandleLeaderboardAway.totalVictories(awayMatches);

    const home = HandleLeaderboardHome.totalVictories(homeMatches);

    return away + home;
  }

  public static totalDraws(awayMatches: Matches[], homeMatches: Matches[]): number {
    const away = HandleLeaderboardAway.totalDraws(awayMatches);

    const home = HandleLeaderboardHome.totalDraws(homeMatches);

    return away + home;
  }

  public static totalLosses(awayMatches: Matches[], homeMatches: Matches[]): number {
    const away = HandleLeaderboardAway.totalLosses(awayMatches);

    const home = HandleLeaderboardHome.totalLosses(homeMatches);

    return away + home;
  }

  public static goalsCount(awayMatches: Matches[], homeMatches: Matches[]): GoalsCount {
    const away = HandleLeaderboardAway.goalsCount(awayMatches);

    const home = HandleLeaderboardHome.goalsCount(homeMatches);

    return {
      favor: away.favor + home.favor,
      own: away.own + home.own,
      balance: away.balance + home.balance,
    };
  }

  public static efficiency(awayMatches: Matches[], homeMatches: Matches[]): number {
    const totalPoints = HandleLeaderboard.totalPoints(awayMatches, homeMatches);
    const totalGames = awayMatches.length + homeMatches.length;

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

export default HandleLeaderboard;

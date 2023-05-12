const teams = [
  {
    id: 1,
    teamName: 'Cruzeiro'
  },
  {
    id: 2,
    teamName: 'Atlético'
  },
  {
    id: 3,
    teamName: 'América'
  }
]

const firstHomeList = [
  {
    homeTeamId: 1,
    homeTeamGoals: 1,
    awayTeamId: 2,
    awayTeamGoals: 1,
    inProgress: false,
  },
  {
    homeTeamId: 1,
    homeTeamGoals: 4,
    awayTeamId: 3,
    awayTeamGoals: 1,
    inProgress: false,
  }
]

const secondHomeList = [
  {
    homeTeamId: 2,
    homeTeamGoals: 3,
    awayTeamId: 1,
    awayTeamGoals: 0,
    inProgress: false,
  },
  {
    homeTeamId: 2,
    homeTeamGoals: 0,
    awayTeamId: 3,
    awayTeamGoals: 1,
    inProgress: true,
  }
]

const thirdHomeList = [
  {
    homeTeamId: 3,
    homeTeamGoals: 3,
    awayTeamId: 1,
    awayTeamGoals: 1,
    inProgress: false,
  },
  {
    homeTeamId: 3,
    homeTeamGoals: 0,
    awayTeamId: 2,
    awayTeamGoals: 1,
    inProgress: false,
  }
]

const homeTable = [
  {
    efficiency: 66.67,
    goalsBalance: 3,
    goalsFavor: 5,
    goalsOwn: 2,
    name: "Cruzeiro",
    totalDraws: 1,
    totalGames: 2,
    totalLosses: 0,
    totalPoints: 4,
    totalVictories: 1
  },
  {
    efficiency: 50,
    goalsBalance: 2,
    goalsFavor: 3,
    goalsOwn: 1,
    name: "Atlético",
    totalDraws: 0,
    totalGames: 2,
    totalLosses: 1,
    totalPoints: 3,
    totalVictories: 1
  },
  {
    efficiency: 50,
    goalsBalance: 1,
    goalsFavor: 3,
    goalsOwn: 2,
    name: "América",
    totalDraws: 0,
    totalGames: 2,
    totalLosses: 1,
    totalPoints: 3,
    totalVictories: 1,
  }]

const firstAwayList = [
  {
    homeTeamId: 2,
    homeTeamGoals: 3,
    awayTeamId: 1,
    awayTeamGoals: 4,
    inProgress: false,
  },
  {
    homeTeamId: 3,
    homeTeamGoals: 1,
    awayTeamId: 1,
    awayTeamGoals: 2,
    inProgress: false,
  }
]

const secondAwayList = [
  {
    homeTeamId: 1,
    homeTeamGoals: 3,
    awayTeamId: 2,
    awayTeamGoals: 3,
    inProgress: false,
  },
  {
    homeTeamId: 3,
    homeTeamGoals: 2,
    awayTeamId: 2,
    awayTeamGoals: 1,
    inProgress: true,
  }
]

const thirdAwayList = [
  {
    homeTeamId: 1,
    homeTeamGoals: 0,
    awayTeamId: 3,
    awayTeamGoals: 2,
    inProgress: false,
  },
  {
    homeTeamId: 2,
    homeTeamGoals: 2,
    awayTeamId: 3,
    awayTeamGoals: 1,
    inProgress: false,
  }
]

const awayTable = [
  {
    efficiency: 66.67,
    goalsBalance: 1,
    goalsFavor: 5,
    goalsOwn: 4,
    name: "Atlético",
    totalDraws: 1,
    totalGames: 2,
    totalLosses: 0,
    totalPoints: 4,
    totalVictories: 1
  },
  {
    efficiency: 50,
    goalsBalance: -1,
    goalsFavor: 2,
    goalsOwn: 3,
    name: "América",
    totalDraws: 0,
    totalGames: 2,
    totalLosses: 1,
    totalPoints: 3,
    totalVictories: 1
  },
  {
    efficiency: 0,
    goalsBalance: -2,
    goalsFavor: 4,
    goalsOwn: 6,
    name: "Cruzeiro",
    totalDraws: 0,
    totalGames: 2,
    totalLosses: 2,
    totalPoints: 0,
    totalVictories: 0
  }]

const leaderboardTable = [
  {
    efficiency: 41.67,
    goalsBalance: 2,
    goalsFavor: 9,
    goalsOwn: 7,
    name: "Atlético",
    totalDraws: 2,
    totalGames: 4,
    totalLosses: 1,
    totalPoints: 5,
    totalVictories: 1,
  },
  {
    efficiency: 50,
    goalsBalance: -2,
    goalsFavor: 1,
    goalsOwn: 3,
    name: "Cruzeiro",
    totalDraws: 0,
    totalGames: 2,
    totalLosses: 1,
    totalPoints: 3,
    totalVictories: 1,
  },
  {
    efficiency: 25,
    goalsBalance: -3,
    goalsFavor: 6,
    goalsOwn: 9,
    name: "América",
    totalDraws: 0,
    totalGames: 4,
    totalLosses: 3,
    totalPoints: 3,
    totalVictories: 1,
  }]

export {
  teams,
  firstHomeList,
  secondHomeList,
  thirdHomeList,
  homeTable,
  firstAwayList,
  secondAwayList,
  thirdAwayList,
  awayTable,
  leaderboardTable
}
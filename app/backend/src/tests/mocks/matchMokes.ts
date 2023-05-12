const matchesList = [
  {
    homeTeamId: 16,
    homeTeamGoals: 1,
    awayTeamId: 8,
    awayTeamGoals: 1,
    inProgress: false,
  },
  {
    homeTeamId: 9,
    homeTeamGoals: 1,
    awayTeamId: 14,
    awayTeamGoals: 1,
    inProgress: false,
  },
  {
    homeTeamId: 4,
    homeTeamGoals: 3,
    awayTeamId: 11,
    awayTeamGoals: 0,
    inProgress: false,
  },
  {
    homeTeamId: 3,
    homeTeamGoals: 0,
    awayTeamId: 2,
    awayTeamGoals: 0,
    inProgress: true,
  }
]

const matchesInProgress = [
  {
    homeTeamId: 3,
    homeTeamGoals: 0,
    awayTeamId: 2,
    awayTeamGoals: 0,
    inProgress: true,
  }
]

const matchesFinished = [
  {
    homeTeamId: 16,
    homeTeamGoals: 1,
    awayTeamId: 8,
    awayTeamGoals: 1,
    inProgress: false,
  },
  {
    homeTeamId: 9,
    homeTeamGoals: 1,
    awayTeamId: 14,
    awayTeamGoals: 1,
    inProgress: false,
  },
  {
    homeTeamId: 4,
    homeTeamGoals: 3,
    awayTeamId: 11,
    awayTeamGoals: 0,
    inProgress: false,
  }
]

const newMatchFail = {
  homeTeamId: 4,
  homeTeamGoals: 3,
  awayTeamId: 4,
  awayTeamGoals: 0,
}

const newMatch = {
  homeTeamId: 4,
  homeTeamGoals: 3,
  awayTeamId: 6,
  awayTeamGoals: 1,
}

const team1 = {
  id: 1,
  teamName: 'Cruzeiro'
}

const team2 = {
  id: 2,
  teamName: 'Atlético'
}

const successTeam1 = {
  type: null,
  message: team1
}

const successTeam2 = {
  type: null,
  message: team2
}

const failTeam = {
  type: 'teamNotFound',
  message: 'Team does not exist'
}

const upGoals = {
  homeTeamGoals: 3,
  awayTeamGoals: 1
}

export {
  matchesList,
  matchesInProgress,
  matchesFinished,
  newMatchFail,
  newMatch,
  successTeam1,
  successTeam2,
  failTeam,
  upGoals
}
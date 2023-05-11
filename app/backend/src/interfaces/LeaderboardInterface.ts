interface Matches {
  id: number;
  homeTeamId: number;
  homeTeamGoals: number;
  awayTeamId: number;
  awayTeamGoals: number;
  inProgress: boolean;
}

interface GoalsCount {
  favor: number;
  own: number;
  balance: number;
}

export { Matches, GoalsCount };

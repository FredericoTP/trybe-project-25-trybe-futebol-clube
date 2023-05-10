interface TeamModelInterface {
  id: number,
  teamName: string,
}

interface AllTeams {
  type: null,
  message: TeamModelInterface[]
}

export { TeamModelInterface, AllTeams };

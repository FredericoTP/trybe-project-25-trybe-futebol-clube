import { Request, Response, NextFunction } from 'express';

const validateNewMatch = (req: Request, res: Response, next: NextFunction) => {
  const { homeTeamId, homeTeamGoals, awayTeamId, awayTeamGoals } = req.body;

  if (!homeTeamId
    || (!homeTeamGoals && homeTeamGoals !== 0)
    || !awayTeamId || (!awayTeamGoals && awayTeamGoals !== 0)) {
    return res.status(400).json({ message: 'All fields must be filled' });
  }

  if (homeTeamId === awayTeamId) {
    return res.status(422).json(
      { message: 'It is not possible to create a match with two equal teams' },
    );
  }

  return next();
};

export default validateNewMatch;

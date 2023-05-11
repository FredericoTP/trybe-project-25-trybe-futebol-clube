import { Router } from 'express';
import { MatchController } from '../controllers';
import { tokenValidation, validateGoals, validateNewMatch } from '../middlewares';

const matchesRouter = Router();

matchesRouter.get('/', MatchController.getAll);

matchesRouter.post(
  '/',
  tokenValidation,
  validateNewMatch,
  MatchController.addMatch,
);

matchesRouter.patch('/:id/finish', tokenValidation, MatchController.update);

matchesRouter.patch(
  '/:id',
  tokenValidation,
  validateGoals,
  MatchController.updateGoals,
);

export default matchesRouter;

import { Router } from 'express';
import { MatchController } from '../controllers';
import { tokenValidation, validateGoals } from '../middlewares';

const matchesRouter = Router();

matchesRouter.get('/', MatchController.getAll);

matchesRouter.patch('/:id/finish', tokenValidation, MatchController.update);

matchesRouter.patch(
  '/:id',
  tokenValidation,
  validateGoals,
  MatchController.updateGoals,
);

export default matchesRouter;

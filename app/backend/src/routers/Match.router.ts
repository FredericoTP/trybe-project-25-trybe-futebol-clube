import { Router } from 'express';
import { MatchController } from '../controllers';
import { tokenValidation } from '../middlewares';

const matchesRouter = Router();

matchesRouter.get('/', MatchController.getAll);

matchesRouter.patch('/:id/finish', tokenValidation, MatchController.update);

export default matchesRouter;

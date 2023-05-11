import { Router } from 'express';
import { MatchController } from '../controllers';

const matchesRouter = Router();

matchesRouter.get('/', MatchController.getAll);

export default matchesRouter;

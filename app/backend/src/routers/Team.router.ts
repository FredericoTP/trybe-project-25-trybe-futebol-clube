import { Router } from 'express';
import TeamController from '../controllers';

const teamsRouter = Router();

teamsRouter.get('/', TeamController.getAll);

export default teamsRouter;

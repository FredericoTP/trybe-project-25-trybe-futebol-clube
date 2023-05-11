import { Router } from 'express';
import { LoginController } from '../controllers';
import validateLogin from '../middlewares';

const loginRouter = Router();

loginRouter.post('/', validateLogin, LoginController.login);

export default loginRouter;

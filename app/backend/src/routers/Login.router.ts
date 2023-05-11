import { Router } from 'express';
import { LoginController } from '../controllers';
import { validateLogin, tokenValidation } from '../middlewares';

const loginRouter = Router();

loginRouter.post('/', validateLogin, LoginController.login);

loginRouter.get('/role', tokenValidation, LoginController.getRole);

export default loginRouter;

import { Response, Request } from 'express';
import { LoginService } from '../services';
import { mapError } from '../utils/errorMap';

class LoginController {
  public static async login(req: Request, res: Response) {
    const loginInfo = req.body;

    const { type, message } = await LoginService.login(loginInfo);

    if (type) return res.status(mapError(type)).json({ message });

    return res.status(200).json(message);
  }

  public static getRole(req: Request, res: Response) {
    const { infoToken } = req.body;

    return res.status(200).json({ role: infoToken.role });
  }
}

export default LoginController;

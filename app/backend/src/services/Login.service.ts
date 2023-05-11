import UserLogin from '../interfaces/UserInterface';
import UserService from './User.service';
import { generateToken } from '../utils/auth';

class LoginService {
  public static async login(userInfo: UserLogin) {
    const { email } = userInfo;
    const user = await UserService.getByLogin(userInfo);

    if (user.type) return user;

    const token = generateToken({ email });

    return { type: null, message: { token } };
  }
}

export default LoginService;

import UserLogin from '../interfaces/UserInterface';
import UserService from './User.service';
import { generateToken } from '../utils/auth';

class LoginService {
  public static async login(userInfo: UserLogin) {
    const { email } = userInfo;
    const user = await UserService.getByLogin(userInfo);

    if (user.type) return user;

    let role = '';

    if (typeof user.message !== 'string') role = user.message.role;

    const token = generateToken({ email, role });

    return { type: null, message: { token } };
  }
}

export default LoginService;

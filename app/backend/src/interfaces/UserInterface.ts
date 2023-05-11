interface UserLogin {
  email: string;
  password: string;
}

interface ModelUser {
  id: number;
  username: string;
  role: string;
  email: string;
  password: string;
}

export default UserLogin;
export { ModelUser };

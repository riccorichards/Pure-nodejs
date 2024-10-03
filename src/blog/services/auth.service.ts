import AuthRepository from "../repositories/auth.repo";
import { IncomingSignUp, SignIn } from "../types/auth.dto";

class AuthService {
  private authRepo: AuthRepository;

  constructor() {
    this.authRepo = new AuthRepository();
  }

  async SignUpService(input: IncomingSignUp) {
    const len = (await this.authRepo.LengthOfUsers()) || 0;

    const newUser = {
      id: len < 1 ? 0 : len + 1,
      ...input,
    };
    return await this.authRepo.SignUp(newUser);
  }

  async LoginService(input: SignIn) {
    const { email, username } = input;
    const user = await this.authRepo.getUserByEmail(email);
    if (!user) return null;
    return username === user.username;
  }
}

export default AuthService;

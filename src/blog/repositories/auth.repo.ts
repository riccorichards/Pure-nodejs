import { IncomingSignUp, UserType } from "../types/auth.dto";
import Tools from "../utils/tools";
import user from "../localDb/user";
import path from "node:path";
import { promises as fs } from "node:fs";

class AuthRepository {
  private toolsRepo: Tools;

  constructor() {
    this.toolsRepo = new Tools();
  }

  async LengthOfUsers() {
    try {
      return await user.length;
    } catch (error) {
      this.toolsRepo.handleError(error);
    }
  }

  async SignUp(input: UserType) {
    try {
      const { id, username, email, profileImg } = input;
      user.push({
        id,
        username,
        email,
        profileImg,
      });
      const filePath = path.join(__dirname, "../localDb/user.ts");
      await fs.writeFile(
        filePath,
        `export default ${JSON.stringify(user)}`,
        "utf8"
      );
      return true;
    } catch (error) {
      this.toolsRepo.handleError(error);
    }
  }

  async getUserByEmail(email: string) {
    try {
      return await user.find((user) => user.email === email);
    } catch (error) {
      this.toolsRepo.handleError(error);
    }
  }
}

export default AuthRepository;

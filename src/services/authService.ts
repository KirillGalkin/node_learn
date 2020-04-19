import { userService } from "./userService";
import { User } from "../entity/User";
import * as jwt from "jsonwebtoken";
import { secret } from "../../config/auth";
class AuthService {
  async login(login: string, password: string) {
    const userLoggedIn = await userService.login(login, password);
    if (userLoggedIn) {
      return await this.getToken(userLoggedIn);
    } else {
      throw "Incorrect User or Password";
    }
  }

  private getToken(userLoggedIn: User) {
    const signPayload = {
      id: userLoggedIn.id,
      password: userLoggedIn.password,
    };
    return jwt.sign(signPayload, secret, { expiresIn: "15m" });
  }
}

export const authService = new AuthService();

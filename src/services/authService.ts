import { userService } from "./userService";
import { User } from "../entity";
import * as jwt from "jsonwebtoken";
import { secret, expirationTime } from "../../config/auth";
class AuthService {
  async login(login: string, password: string) {
    const userLoggedIn = await userService.login(login, password);
    if (userLoggedIn) {
      return await this.getToken(userLoggedIn);
    }
  }

  private getToken(userLoggedIn: User) {
    const signPayload = {
      id: userLoggedIn.id,
      password: userLoggedIn.password,
    };
    return jwt.sign(signPayload, secret, { expiresIn: expirationTime });
  }
}

export const authService = new AuthService();

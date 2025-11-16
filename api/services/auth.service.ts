import jwt from "jsonwebtoken";
import { User } from "../types/user";

export class AuthService {
  static generateToken(user: User): string {
    const payload = {
      id: user.id,
      raw_address: user.raw_address,
      role: user.role
    };

    const secret = process.env.JWT_SECRET || "secret";
    const expiresIn = "7d";

    return jwt.sign(payload, secret, { expiresIn });
  }
}

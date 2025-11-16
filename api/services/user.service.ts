import { User } from "../types/user";
import { TonService } from "./ton.service";
import {
  createUserWithRawAddress,
  getUserByRawAddress,
  updateUserOnFirstLogin
} from "../models/user";

interface LoginOptions {
  name?: string | null;
  tokens?: number;
  course_id?: string | null;
}

export class UserService {
  static async loginWithRawAddress(
    rawAddress: string,
    options: LoginOptions = {}
  ): Promise<User> {
    const normalized = TonService.normalizeRawAddress(rawAddress);

    if (!TonService.isValidRawAddress(normalized)) {
      throw new Error("Invalid TON raw address");
    }

    let user = await getUserByRawAddress(normalized);

    if (user) {
      if (!user.name && options.name) {
        user = await updateUserOnFirstLogin(user.id, { name: options.name });
      }
      return user;
    }

    return createUserWithRawAddress(normalized, options);
  }
}

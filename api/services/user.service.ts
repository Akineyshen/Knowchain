import { User } from "../types/user";
import { TonService } from "./ton.service";
import {
  createUserWithRawAddress,
  getUserByRawAddress,
  updateUserOnFirstLogin,
  updateTokens 
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

  static async addTokens(userId: string, amount: number): Promise<User> {
    if (!userId) {
        throw new Error("Target User ID is required.");
    }

    if (typeof amount !== 'number' || amount === 0) {
      throw new Error("Invalid token amount.");
    }
    
    const updatedUser = await updateTokens(userId, amount); 
    
    if (!updatedUser) {
      throw new Error("User not found."); 
    }
    
    return updatedUser;
  }
}
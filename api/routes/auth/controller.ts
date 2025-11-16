import { Request, Response } from "express";
import { UserService } from "../../services/user.service";
import { AuthService } from "../../services/auth.service";
import { RESPONSE_MESSAGES } from "../../constants";

export const tonLogin = async (req: Request, res: Response) => {
  try {
    const { raw_address, name, tokens, course_id } = req.body;

    if (!raw_address) {
      return res.status(400).json({
        error: RESPONSE_MESSAGES.BAD_REQUEST,
        details: "raw_address is required"
      });
    }

    const user = await UserService.loginWithRawAddress(raw_address, {
      name,
      tokens,
      course_id
    });

    const token = AuthService.generateToken(user);

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 1000 * 60 * 60 * 24 * 30
    });

    return res.json({
      user: {
        id: user.id,
        raw_address: user.raw_address,
        name: user.name,
        tokens: user.tokens,
        course_id: user.course_id,
        role: user.role
      }
    });
  } catch (err: any) {
    console.error("TON login error:", err);

    if (err.message === "Invalid TON raw address") {
      return res.status(400).json({ error: err.message });
    }

    return res.status(500).json({
      error: RESPONSE_MESSAGES.INTERNAL_ERROR
    });
  }
};

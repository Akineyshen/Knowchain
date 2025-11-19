import { Request, Response } from "express";
import { UserService } from "../../services/user.service";
import { AuthService } from "../../services/auth.service";
import { TonService } from "@/services/ton.service";
import crypto from "crypto";

export const getTonProofPayload = (_req: Request, res: Response): void => {
    const payload = crypto.randomBytes(32).toString("base64");
    res.json({ payload });
};

export const tonLogin = async (req: Request, res: Response) => {
  try {
    const { address, proof, name, tokens, course_id } = req.body;

    if (!address || !proof) {
      return res.status(400).json({
        error: "address and proof required"
      });
    }

    const isValid = await TonService.validateProof(address, proof);

    if (!isValid) {
      return res.status(401).json({ error: "Invalid TON proof" });
    }

    const user = await UserService.loginWithRawAddress(address, {
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

    return res.json({ user });

  } catch (err) {
    console.error("TON login error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
};

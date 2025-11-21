import { Request, Response } from "express";
import { UserService } from "../../services/user.service";
import { RESPONSE_MESSAGES } from "../../constants";

export const getMe = async (req: Request, res: Response) => {
  const user = (req as any).user;
  return res.json({ user });
};

export const addTokensToUser = async (req: Request, res: Response) => {
    const targetUserId = req.params.userId; 
    const amount = req.body.amount; 

    try {
        const updatedUser = await UserService.addTokens(targetUserId, amount);
        
        return res.json({ 
            message: "Complete.",
            user: updatedUser 
        });

    } catch (err: any) {
        console.error("Token add error:", err);

        if (err.message.includes("User not found") || err.message.includes("required")) {
            return res.status(404).json({ error: err.message });
        }
        
        if (err.message.includes("Invalid token amount")) {
            return res.status(400).json({ error: err.message });
        }
        
        return res.status(500).json({ 
            error: RESPONSE_MESSAGES.INTERNAL_ERROR 
        });
    }
};
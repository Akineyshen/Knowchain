import { Request, Response, NextFunction } from "express";
import passport from "passport";
import { RESPONSE_MESSAGES } from "../../constants";

export const ensureAuthenticated = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  passport.authenticate(
    "jwt",
    { session: false },
    (err: unknown, user: any) => {
      if (err || !user) {
        res.status(401).json({ error: RESPONSE_MESSAGES.UNAUTHORIZED });
        return;
      }

      // Attach user to request
      (req as any).user = user;
      next();
    }
  )(req, res, next);
};

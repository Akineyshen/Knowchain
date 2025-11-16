import passport from "passport";
import { Strategy as JwtStrategy, StrategyOptions } from "passport-jwt";
import dotenv from "dotenv";
import { getUserById } from "../models/user";

dotenv.config();

const cookieExtractor = (req: any): string | null => {
  if (req && req.cookies && req.cookies.token) {
    return req.cookies.token as string;
  }
  return null;
};

const jwtOptions: StrategyOptions = {
  jwtFromRequest: cookieExtractor,
  secretOrKey: process.env.JWT_SECRET || "secret"
};

passport.use(
  new JwtStrategy(jwtOptions, async (jwtPayload: any, done) => {
    try {
      const user = await getUserById(jwtPayload.id);
      if (user) {
        return done(null, user);
      }
      return done(null, false);
    } catch (err) {
      return done(err, false);
    }
  })
);

export default passport;

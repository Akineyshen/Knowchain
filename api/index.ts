import express from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import compression from "compression";
import dotenv from "dotenv";
import passport from "./config/passport";
import { initDb } from "./utils";

import authRoutes from "./routes/auth";
import userRoutes from "./routes/user";
import courseRoutes from "./routes/course";
import withdrawRoutes from "./routes/withdraw";

dotenv.config();

const app = express();

app.use(cors()); // ✅ БЕЗ credentials
app.use(morgan("dev"));
app.use(helmet());
app.use(compression());
app.use(express.json());
app.use(passport.initialize()); // ✅ passport через Bearer

app.use("/auth", authRoutes);
app.use("/user", userRoutes);
app.use("/course", courseRoutes);
app.use("/withdraw", withdrawRoutes);

const port = process.env.PORT || 3001;

initDb()
    .then(() => {
        app.listen(port, () => {
            console.log(`API listening on port ${port}`);
        });
    })
    .catch(err => {
        console.error("Database init failed:", err);
        process.exit(1);
    });

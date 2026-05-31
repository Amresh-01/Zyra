import express, { Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import session from "express-session";

import connectDB from "./db/db.connect";

console.log("connectDB =", connectDB);

dotenv.config();

const app = express();
const PORT: number = Number(process.env.PORT) || 8080;

// Middleware
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());

app.use(
  session({
    secret: process.env.SESSION_SECRET || "someSecretKey",
    resave: false,
    saveUninitialized: false,
  })
);

// Routes
app.get("/", (_req: Request, res: Response) => {
  res.send("Zyra Backend is Running...");
});

// app.use("/api/user", userRoutes);
// app.use("/api/foods", foodRoutes);
// app.use("/api/order", orderRoutes);
// app.use("/api/cart", cartRoutes);

const startServer = async (): Promise<void> => {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(
        `Server running at http://localhost:${PORT}`
      );
    });
  } catch (error) {
    if (error instanceof Error) {
      console.error(
        "Server startup failed:",
        error.message
      );
    } else {
      console.error("Unknown server error");
    }

    process.exit(1);
  }
};

startServer();
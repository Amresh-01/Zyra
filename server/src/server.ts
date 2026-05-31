import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import session from "express-session";

import connectDB from "./db/db.connect";
import routes from "./routes";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080

app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());

app.use(
  session({
    secret: process.env.SESSION_SECRET || "secret",
    resave: false,
    saveUninitialized: false,
  })
);

app.use("/api", routes);

app.get("/", (_req, res) => {
  res.send("Zyra Backend Running.");
});

const startServer = async () => {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("Server failed:", err);
    process.exit(1);
  }
};

startServer();
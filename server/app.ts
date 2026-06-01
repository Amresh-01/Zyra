import express from "express";
import cors from "cors";
import session from "express-session";

import routes from "./src/routes";
import { requestIdMiddleware } from "./src/middleware/requestId";
import { requestLogger } from "./src/middleware/requestLogger";
import { errorHandler } from "./src/middleware/errorHandler";
import { messages } from "./src/data/messgae.data";

const app = express();


app.get("/", (req,res) => {
  res.status(200).json({
    success: true,
    message: "Zyra backemd is Running",
  });
});


app.use(cors());
app.use(express.json());

app.use(
  session({
    secret: process.env.SESSION_SECRET || "secret",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(requestIdMiddleware);
app.use(requestLogger);

app.use("/api", routes);

app.use(errorHandler);

export default app;
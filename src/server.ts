import "module-alias/register";
import express, { Application, Response } from "express";
import path from "path";
import dotenv from "dotenv";
import logger from "morgan";
import cors from "cors";
import mongoose from "mongoose";
import usersRouter from "@routers/users";
import loginRouter from "@routers/login";
import registrationRouter from "@routers/registration";
import uploadRouter from "@routers/upload";
import cookieParser from "cookie-parser";
dotenv.config();
const PORT = process.env.APP_PORT || 5000;
const DB_CONNECT_URL =
  process.env.DB_CONNECT_URL || "mongodb://127.0.0.1:27017/users";
const staticPath = path.join(__dirname, "..", "client", "dist");
const app: Application = express();
app.use(logger("tiny"));
app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use("/users", usersRouter);
app.use("/signin", loginRouter);
app.use("/signup", registrationRouter);
app.use("/upload", uploadRouter);
app.use(express.static(staticPath));
app.all("/*", (_, res: Response) => {
  res.sendFile(path.join(staticPath, "index.html"));
});
mongoose
  .connect(DB_CONNECT_URL)
  .then(() => {
    console.log(`Connected to MongoDB database with URL: ${DB_CONNECT_URL}`);
    app.listen(PORT, () => {
      console.log(`Server is running at http://localhost:${PORT}`);
    });
  })
  .catch((err: Error) => {
    console.log(`Database connection error: ${err}`);
    process.exit(1);
  });

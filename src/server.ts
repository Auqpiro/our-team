import "module-alias/register";
import express, { Application, Response } from "express";
import path from "path";
import dotenv from "dotenv";
import logger from "morgan";
import cors from "cors";
import usersRouter from "@routers/users";
import loginRouter from "@routers/login";
import registrationRouter from "@routers/registration";
dotenv.config();
const PORT = process.env.APP_PORT;
const staticPath = path.join(__dirname, "..", "client", "dist");
const app: Application = express();
app.use(logger("tiny"));
app.use(express.json());
app.use(cors());
app.use("/users", usersRouter);
app.use("/signin", loginRouter);
app.use("/signup", registrationRouter);
app.use(express.static(staticPath));
app.all("/*", (_, res: Response) => {
  res.sendFile(path.join(staticPath, 'index.html'));
});
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});

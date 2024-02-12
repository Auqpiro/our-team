import "module-alias/register";
import express, { Application, Request, Response, NextFunction } from "express";
import * as dotenv from "dotenv";
import logger from "morgan";
import usersRouter from "@routers/users";
import loginRouter from "@routers/login";
import registrationRouter from "@routers/registration";
dotenv.config();
const PORT = process.env.APP_PORT;
const app: Application = express();
app.use(logger("tiny"));
app.use(express.json());
app.use((req: Request, res: Response, next: NextFunction) => {
  if (req.headers.accept?.includes("json") || req.xhr) {
    next();
  } else {
    res.send("Not acceptable");
  }
});
app.use("/users", usersRouter);
app.use("/login", loginRouter);
app.use("/signup", registrationRouter);
app.all("/*", (_, res: Response) => {
  res.send("Server is running");
});
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});

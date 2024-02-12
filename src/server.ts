import express, { Application, Express, Response } from "express";
import * as dotenv from "dotenv";
import logger from "morgan";
dotenv.config();
const PORT = process.env.PORT;
const app: Application = express();
app.use(logger("tiny"));
app.use(express.json());
app.get("/*", (_, res: Response) => {
  res.send("Server is running");
});
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});

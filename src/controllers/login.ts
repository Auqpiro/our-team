import { Request, Response } from "express";
const signIn = (req: Request, res: Response) => {
  const { body } = req;
  res.send(`You are send this data: ${JSON.stringify(body)}`);
};
export { signIn };

import { Request, Response } from "express";
const signUp = (req: Request, res: Response) => {
  const { body } = req;
  res.send(`You are send this data: ${JSON.stringify(body)}`);
};
export { signUp };

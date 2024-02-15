import User from "@models/user";
import { Request, Response } from "express";
import jwt, { Secret } from "jsonwebtoken";
const signIn = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(200).send("All fields must be filled");
  } else {
    await User.signIn({ email, password }, (error, user) => {
      if (error) {
        res.status(401).send({ error });
      } else {
        const JWT_SECRET: Secret = process.env.JWT_SECRET || "";
        const token = jwt.sign({ id: user?.id }, JWT_SECRET, {
          expiresIn: "1d",
        });
        res
          .status(200)
          .cookie("token", token, { maxAge: 12 * 60 * 60, httpOnly: true })
          .send();
      }
    });
  }
};
export { signIn };

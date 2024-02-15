import { Request, Response } from "express";
import validator from "validator";
import User from "@models/user";
import jwt, { Secret } from "jsonwebtoken";
const signUp = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    res.status(200).send("All fields must be filled");
  } else if (!validator.isEmail(email)) {
    res.status(200).send("Email is not valid");
  } else if (!validator.isStrongPassword(password)) {
    res.status(200).send("Password is not strong enough");
  } else {
    await User.signUp({ name, email, password }, (error, user) => {
      if (error) {
        res.status(409).send({ error });
      } else {
        const JWT_SECRET: Secret = process.env.JWT_SECRET || "";
        const token = jwt.sign({ id: user?.id }, JWT_SECRET, {
          expiresIn: "1d",
        });
        res
          .status(201)
          .cookie("token", token, { maxAge: 12 * 60 * 60, httpOnly: true })
          .send();
      }
    });
  }
};
export { signUp };

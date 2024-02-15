import User from "@models/user";
import { Request, Response } from "express";
import jwt, { Secret } from "jsonwebtoken";
const getUsers = (req: Request, res: Response) => {
  if (!("token" in req.cookies)) {
    res.status(401).send({ error: "You must be authorised" });
  } else {
    const { token }: Record<string, string> = req.cookies;
    const JWT_SECRET: Secret = process.env.JWT_SECRET || "";
    jwt.verify(token, JWT_SECRET, (error) => {
      if (error) {
        res.status(401).send({ error: error.message });
      } else {
        User.find({}, { name: 1 })
          .sort({ updatedAt: -1 })
          .then((allUsers) => res.status(200).send(allUsers))
          .catch((error) => res.status(500).send({ error }));
      }
    });
  }
};
const getUser = (req: Request, res: Response) => {
  const { id } = req.params;
  if (!("token" in req.cookies)) {
    res.status(401).send({ error: "You must be authorised" });
  } else {
    const { token }: Record<string, string> = req.cookies;
    const JWT_SECRET: Secret = process.env.JWT_SECRET || "";
    jwt.verify(token, JWT_SECRET, (error) => {
      if (error) {
        res.status(401).send({ error: error.message });
      } else {
        User.findById(id, {
          name: 1,
          role: 1,
          icon: 1,
          email: 1,
          phone: 1,
          info: 1,
        })
          .then((userById) => res.status(200).send(userById))
          .catch((error) => res.status(500).send({ error }));
      }
    });
  }
};
const updateUser = (req: Request, res: Response) => {
  const { id } = req.params;
  if (!("token" in req.cookies)) {
    res.status(401).send({ error: "You must be authorised" });
  } else {
    const { token }: Record<string, string> = req.cookies;
    const JWT_SECRET: Secret = process.env.JWT_SECRET || "";
    jwt.verify(token, JWT_SECRET, (error, decoded) => {
      if (error) {
        res.status(401).send({ error: error.message });
      } else {
        if (decoded && !(typeof decoded === "string")) {
          if ("id" in decoded) {
            const { id: actionCreatorID } = decoded;
            res.status(200).send({
              whatToDo: req.body,
              whoGotUpdate: id,
              whoUpdated: actionCreatorID,
            });
          }
        }
      }
    });
  }
};
export { getUsers, getUser, updateUser };

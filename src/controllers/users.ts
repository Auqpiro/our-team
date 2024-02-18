import User from "@models/user";
import { Request, Response } from "express";
interface LocalRequest extends Request {
  local?: Record<string, unknown>;
}
const getUsers = (_req: Request, res: Response) => {
  User.find({}, { name: 1 })
    .sort({ updatedAt: -1 })
    .then((allUsers) => res.status(200).send(allUsers))
    .catch((error) => res.status(500).send({ error }));
};
const getUser = (req: Request, res: Response) => {
  const { id } = req.params;
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
};
const updateUser = (req: LocalRequest, res: Response) => {
  const { id } = req.params;
  if (
    req.local?.decoded &&
    !(typeof req.local?.decoded === "string") &&
    typeof req.local?.decoded === "object"
  ) {
    const { decoded } = req.local;
    if ("id" in decoded) {
      const { id: actionCreatorID } = decoded;
      res.status(200).send({
        whatToDo: req.body,
        whoGotUpdate: id,
        whoUpdated: actionCreatorID,
      });
    }
  }
};
export { getUsers, getUser, updateUser };

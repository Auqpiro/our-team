import User from "@models/user";
import { Request, Response } from "express";
interface LocalRequest extends Request {
  local?: Record<string, string>;
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
const updateUserInfo = (req: Request, res: Response) => {
  const { id } = req.params;
  User.findByIdAndUpdate(id, req.body)
    .then(() => res.status(200).send())
    .catch((error) => res.status(500).send({ error }));
};
const toggleLike = (req: LocalRequest, res: Response) => {
  const { id } = req.params;
  if (
    req.local?.decoded &&
    !(typeof req.local?.decoded === "string") &&
    typeof req.local?.decoded === "object"
  ) {
    const { decoded } = req.local;
    if ("id" in decoded) {
      const { id: actionCreatorID } = decoded;
      User.findById(actionCreatorID, { likes: 1 })
        .then((userById) => {
          if (!userById) {
            throw new Error(`not finded user ${id}`);
          }
          if (!("likes" in userById)) {
            throw new Error(`User ${id} has no likes`);
          }
          const { likes } = userById;
          if (!Array.isArray(likes)) {
            throw new Error(`User ${id} has no likes`);
          }
          const likeInd = likes.findIndex((likedUserID) => likedUserID === id);
          let updatedLikes = likes.slice();
          updatedLikes.splice(likeInd, Number(!!~likeInd));
          updatedLikes = ~likeInd
            ? updatedLikes
            : (updatedLikes = likes.concat([id]));
          User.findByIdAndUpdate(actionCreatorID, { likes: updatedLikes })
            .then(() => res.status(200).send())
            .catch((error) => res.status(500).send({ error }));
        })
        .catch((error) => res.status(500).send({ error }));
    }
  }
};
export { getUsers, getUser, toggleLike, updateUserInfo };

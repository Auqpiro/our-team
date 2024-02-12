import { Request, Response } from "express";
const getUsers = (_req: Request, res: Response) => {
  res.send("You are successfuly get list of users");
};
const getUser = (req: Request, res: Response) => {
  const { id } = req.params;
  res.send(`You are successfuly get ${id} user`);
};
const updateUser = (req: Request, res: Response) => {
  const { id } = req.params;
  res.send(`You are successfuly update ${id} user`);
};
export { getUsers, getUser, updateUser };

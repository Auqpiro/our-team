import express from "express";
import { getUser, getUsers, updateUser } from "@controllers/users";
const router = express.Router();
router.get("/", getUsers);
router.get("/:id", getUser);
router.patch("/:id", updateUser);
export default router;

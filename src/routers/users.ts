import express from "express";
import { getUser, getUsers, updateUser } from "@controllers/users";
import cors from "cors";
const router = express.Router();
router.use(
  cors({
    credentials: true,
  })
);
router.get("/", getUsers);
router.get("/:id", getUser);
router.patch("/:id/", updateUser);
export default router;

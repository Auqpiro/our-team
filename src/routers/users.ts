import cors from "cors";
import express from "express";
import { getUser, getUsers, updateUser } from "@controllers/users";
const router = express.Router();
router.use(
  cors({
    methods: ["GET", "PATCH"],
  })
);
router.get("/", getUsers);
router.get("/:id", getUser);
router.patch("/:id", updateUser);
export default router;

import express from "express";
import { getUser, getUsers, updateUser } from "@controllers/users";
import cors from "cors";
import { jwtAuthCookiesMiddleware } from "@middlewares/auth";
const router = express.Router();
router.use(
  cors({
    credentials: true,
  })
);
router.get("/", jwtAuthCookiesMiddleware, getUsers);
router.get("/:id", jwtAuthCookiesMiddleware, getUser);
router.patch("/:id/", jwtAuthCookiesMiddleware, updateUser);
export default router;

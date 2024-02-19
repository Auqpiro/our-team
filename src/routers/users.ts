import express from "express";
import { getUser, getUsers, toggleLike, updateUserInfo } from "@controllers/users";
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
router.patch("/:id/info", jwtAuthCookiesMiddleware, updateUserInfo);
router.patch("/:id/like", jwtAuthCookiesMiddleware, toggleLike);
export default router;

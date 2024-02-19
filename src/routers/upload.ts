import express from "express";
import multer, { memoryStorage } from "multer";
import { jwtAuthCookiesMiddleware } from "@middlewares/auth";
import { uploadUserIcon } from "@controllers/upload";
const upload = multer({ storage: memoryStorage() });
const router = express.Router();
router.post(
  "/:id/icon",
  upload.single("icon"),
  jwtAuthCookiesMiddleware,
  uploadUserIcon
);
export default router;

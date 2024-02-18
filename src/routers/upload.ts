import express, { Request, Response } from "express";
import jwt, { Secret } from "jsonwebtoken";
import multer, { memoryStorage } from "multer";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { imagesStorageRef } from "../storages/firebase";
import User from "@models/user";
import { jwtAuthCookiesMiddleware } from "@middlewares/auth";
const upload = multer({ storage: memoryStorage() });
const router = express.Router();
router.post(
  "/:id/icon",
  upload.single("icon"),
  jwtAuthCookiesMiddleware,
  (req: Request, res: Response) => {
    const { id } = req.params;
    const { file } = req;
    if (!file) {
      res.status(400).send({ error: "No file uploaded" });
      return;
    }
    const spaceRef = ref(imagesStorageRef, `${id}/${Date.now()}`);
    const metadata = {
      contentType: file.mimetype,
    };
    uploadBytes(spaceRef, file.buffer, metadata)
      .then(() => getDownloadURL(spaceRef))
      .then((url) => User.findByIdAndUpdate(id, { icon: url }))
      .then(() => res.status(200).send())
      .catch((error) => {
        res.status(500).send({ error });
      });
  }
);
export default router;

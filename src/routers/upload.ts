import express, { Request, Response } from "express";
import jwt, { Secret } from "jsonwebtoken";
import multer, { memoryStorage } from "multer";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { imagesStorageRef } from "../storages/firebase";
import User from "@models/user";
const upload = multer({ storage: memoryStorage() });
const router = express.Router();
router.post(
  "/:id/icon",
  upload.single("icon"),
  (req: Request, res: Response) => {
    const { id } = req.params;
    if (!("token" in req.cookies)) {
      res.status(401).send({ error: "You must be authorised" });
    } else {
      const { token }: Record<string, string> = req.cookies;
      const JWT_SECRET: Secret = process.env.JWT_SECRET || "";
      jwt.verify(token, JWT_SECRET, (error) => {
        if (error) {
          res.status(401).send({ error: error.message });
        } else {
          const { file } = req;
          if (!file) {
            res.status(400).send({ error: "No file uploaded" });
          } else {
            const spaceRef = ref(imagesStorageRef, `${id}/${Date.now()}`);
            const metadata = {
              contentType: file.mimetype,
            };
            uploadBytes(spaceRef, file.buffer, metadata)
              .then(() => getDownloadURL(spaceRef))
              .then((url) => User.findByIdAndUpdate(id, { icon: url }))
              .then(() => res.status(200).send())
              .catch((error) => {
                console.log(error);
                res.status(500).send({ error });
              });
          }
        }
      });
    }
  }
);
export default router;

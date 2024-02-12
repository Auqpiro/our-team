import { signIn } from "@controllers/login";
import cors from "cors";
import express from "express";
const router = express.Router();
router.use(
  cors({
    methods: ["POST"],
  })
);
router.post("/", signIn);
export default router;

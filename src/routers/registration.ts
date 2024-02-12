import { signUp } from "@controllers/registration";
import cors from "cors";
import express from "express";
const router = express.Router();
router.use(
  cors({
    methods: ["POST"],
  })
);
router.post("/", signUp);
export default router;

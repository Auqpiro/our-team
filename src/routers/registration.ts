import { signUp } from "@controllers/registration";
import express from "express";
const router = express.Router();
router.post("/", signUp);
export default router;

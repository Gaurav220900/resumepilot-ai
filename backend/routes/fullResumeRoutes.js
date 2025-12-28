import express from "express";
import { enhanceEntireResume } from "../controllers/fullResumeController.js";

const router = express.Router();

router.post("/enhance-all", enhanceEntireResume);

export default router;

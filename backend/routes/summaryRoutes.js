import express from "express";
import { enhanceSummary } from "../controllers/summaryController.js";

const router = express.Router();

router.post("/enhance-summary", enhanceSummary);

export default router;

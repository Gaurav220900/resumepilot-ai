import express from "express";
import { enhanceAchievements } from "../controllers/achievementsController.js";

const router = express.Router();

router.post("/enhance-achievements", enhanceAchievements);
export default router;
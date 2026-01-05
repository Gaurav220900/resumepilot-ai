// /backend/routes/pdfRoutes.js
import express from "express";
import { generateResumePDF } from "../controllers/pdfController.js";

const router = express.Router();

router.post("/resume", generateResumePDF);

export default router;

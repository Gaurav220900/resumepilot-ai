import express from 'express';
import { enhanceExperience } from '../controllers/experienceController.js';

const router = express.Router();

router.post('/enhance-experience', enhanceExperience);

export default router;
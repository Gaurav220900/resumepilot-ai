import express from 'express';
import { enhanceSkills } from '../controllers/skillsController.js';

const router = express.Router();

router.post('/enhance-skills', enhanceSkills);

export default router;
import express from 'express';
import { enhanceProjects } from '../controllers/projectController.js';

const router = express.Router();

router.post('/enhance-projects', enhanceProjects);

export default router;
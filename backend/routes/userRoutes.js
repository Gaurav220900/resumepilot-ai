import express from 'express';
const router = express.Router();

import { profileDetails} from '../controllers/userController.js';

router.post('/profile', profileDetails);

export default router;
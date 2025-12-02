import express from 'express';
const router = express.Router();

import { profileDetails} from '../controllers/userController.js';

router.put('/profile', profileDetails);

module.exports = router;
import express from 'express';
import { signup, login } from '../controllers/authController.js';
import { validate } from '../middlewares/validateHandler.js';
import { signupSchema } from '../schema/authSchema.js';

const router = express.Router();

router.post('/signup', validate(signupSchema), signup);
router.post('/login', login);

export default router;

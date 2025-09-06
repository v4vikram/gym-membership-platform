import express from 'express';
import { signup, login, logout, getMe } from '../controllers/authController.js';
import { validate } from '../middlewares/validateHandler.js';
import { loginSchema, signupSchema } from '../schema/authSchema.js';

const router = express.Router();

router.post('/signup', validate(signupSchema), signup);
router.post('/login', validate(loginSchema),  login);
router.get('/me', getMe);


export default router;

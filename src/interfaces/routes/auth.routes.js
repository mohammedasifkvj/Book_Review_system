import express from 'express';
import { signupController, loginController } from '../controllers/auth.controller.js';

const router = express.Router();

// @route   POST /signup
// @desc    Register a new user
router.post('/signup', signupController);

// @route   POST /login
// @desc    Authenticate user and return access + refresh tokens
router.post('/login', loginController);

export default router;
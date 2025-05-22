import express from 'express';
import { searchBooksController } from '../controllers/search.controller.js';

const router = express.Router();

// @route   GET /search
// @desc    Search books by title or author (partial, case-insensitive)
router.get('/', searchBooksController);

export default router;
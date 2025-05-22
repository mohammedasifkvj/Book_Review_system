import express from 'express';
import {
  addBookController,
  getAllBooksController,
  getBookByIdController,
  addReviewController
} from '../controllers/book.controller.js';

import { authenticateToken } from '../middlewares/auth.middleware.js';

const router = express.Router();

// @route   POST /books
// @desc    Add a new book (Authenticated users only)
router.post('/', authenticateToken, addBookController);

// @route   GET /books
// @desc    Get all books with optional filters & pagination
router.get('/', getAllBooksController);

// @route   GET /books/:id
// @desc    Get book details by ID (includes avg rating and paginated reviews)
router.get('/:id', getBookByIdController);

// @route   POST /books/:id/reviews
// @desc    Add a review for a book (Authenticated users only)
router.post('/:id/reviews', authenticateToken, addReviewController);

export default router;
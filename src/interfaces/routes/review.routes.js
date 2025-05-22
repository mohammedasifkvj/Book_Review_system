import express from 'express';
import {
  updateReviewController,
  deleteReviewController
} from '../controllers/review.controller.js';

import { authenticateToken } from '../middlewares/auth.middleware.js';

const router = express.Router();

// @route   PUT /reviews/:id
// @desc    Update review (Authenticated users only)
router.put('/:id', authenticateToken, updateReviewController);

// @route   DELETE /reviews/:id
// @desc    Delete  review (Authenticated users only)
router.delete('/:id', authenticateToken, deleteReviewController);

export default router;
import express from 'express';

import authRoutes from './auth.routes.js';
import bookRoutes from './book.routes.js';
import reviewRoutes from './review.routes.js';
import searchRoutes from './search.routes.js';

const router = express.Router();

// Prefix routes
router.use('/', authRoutes);
router.use('/books', bookRoutes);
router.use('/reviews', reviewRoutes);
router.use('/search', searchRoutes);   // /api/search?q=...

export default router;
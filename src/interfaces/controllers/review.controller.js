import {
    updateReviewService,
    deleteReviewService
  } from '../../application/services/review.service.js';
  
  export const updateReviewController = async (req, res) => {
    try {
      const review = await updateReviewService(req.params.id, req.body, req.user);
      res.json(review);
    } catch (error) {
      res.status(403).json({ message: error.message });
    }
  };
  
  export const deleteReviewController = async (req, res) => {
    try {
      await deleteReviewService(req.params.id, req.user);
      res.json({ message: 'Review deleted successfully' });
    } catch (error) {
      res.status(403).json({ message: error.message });
    }
  };  
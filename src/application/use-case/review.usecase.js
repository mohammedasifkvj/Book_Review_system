import {
    createReview,
    findReviewByUserAndBook,
    updateReview,
    deleteReview
  } from '../../infrastructure/repositories/review.repository.js';
  
  export const submitReview = async (userId, bookId, data) => {
    const existingReview = await findReviewByUserAndBook(userId, bookId);
    if (existingReview) throw new Error('You have already reviewed this book.');
  
    return await createReview({ user: userId, book: bookId, ...data });
  };
  
  export const updateOwnReview = async (reviewId, userId, updateData, getReviewById) => {
    const review = await getReviewById(reviewId);
    if (!review) throw new Error('Review not found');
    if (review.user.toString() !== userId) throw new Error('Not authorized');
  
    return await updateReview(reviewId, updateData);
  };
  
  export const deleteOwnReview = async (reviewId, userId, getReviewById) => {
    const review = await getReviewById(reviewId);
    if (!review) throw new Error('Review not found');
    if (review.user.toString() !== userId) throw new Error('Not authorized');
  
    return await deleteReview(reviewId);
  };  
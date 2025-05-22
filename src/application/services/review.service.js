import Review from '../../domain/models/review.model.js';

export const updateReviewService = async (reviewId, data, user) => {
  const review = await Review.findById(reviewId);

  if (!review) throw new Error('Review not found');
  if (review.user.toString() !== user._id.toString()) {
    throw new Error('Not authorized to update this review');
  }

  review.rating = data.rating ?? review.rating;
  review.comment = data.comment ?? review.comment;

  return await review.save();
};

export const deleteReviewService = async (reviewId, user) => {
  const review = await Review.findById(reviewId);

  if (!review) throw new Error('Review not found');
  if (review.user.toString() !== user._id.toString()) {
    throw new Error('Not authorized to delete this review');
  }

  await review.deleteOne();
};
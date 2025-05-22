import Review from '../../domain/models/review.model.js';

export const createReview = async (reviewData) => {
  return await Review.create(reviewData);
};

export const findReviewByUserAndBook = async (userId, bookId) => {
  return await Review.findOne({ user: userId, book: bookId });
};

export const getReviewsByBookId = async (bookId, page = 1, limit = 5) => {
  const skip = (page - 1) * limit;
  const reviews = await Review.find({ book: bookId })
    .populate('user', 'name')
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);
  const total = await Review.countDocuments({ book: bookId });
  return { reviews, total };
};

export const updateReview = async (reviewId, updatedData) => {
  return await Review.findByIdAndUpdate(reviewId, updatedData, { new: true });
};

export const deleteReview = async (reviewId) => {
  return await Review.findByIdAndDelete(reviewId);
};

export const calculateAverageRating = async (bookId) => {
  const result = await Review.aggregate([
    { $match: { book: bookId } },
    {
      $group: {
        _id: '$book',
        avgRating: { $avg: '$rating' },
      },
    },
  ]);
  return result.length > 0 ? result[0].avgRating : null;
};
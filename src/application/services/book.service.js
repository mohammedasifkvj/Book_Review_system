import Book from '../../domain/models/book.model.js';
import Review from '../../domain/models/review.model.js';

export const addBookService = async (data, user) => {
  const book = new Book({
    ...data,
    createdBy: user._id,
  });
  return await book.save();
};

export const getAllBooksService = async ({ page = 1, limit = 10, author, genre }) => {
  const query = {};
  if (author) query.author = new RegExp(author, 'i');
  if (genre) query.genre = new RegExp(genre, 'i');

  const books = await Book.find(query)
    .skip((page - 1) * limit)
    .limit(parseInt(limit))
    .sort({ createdAt: -1 });

  const count = await Book.countDocuments(query);

  return {
    books,
    totalPages: Math.ceil(count / limit),
    currentPage: +page,
  };
};

export const getBookByIdService = async (id, page = 1) => {
  const book = await Book.findById(id).lean();
  if (!book) {
    throw new Error('Book not found');
  }

  const limit = 5;
  const reviews = await Review.find({ book: id })
    .populate('user', 'name')
    .skip((page - 1) * limit)
    .limit(limit)
    .sort({ createdAt: -1 });

  const reviewCount = await Review.countDocuments({ book: id });
  const avgRating = await Review.aggregate([
    { $match: { book: book._id } },
    { $group: { _id: null, avg: { $avg: '$rating' } } },
  ]);

  return {
    ...book,
    averageRating: avgRating[0]?.avg || 0,
    reviews,
    totalPages: Math.ceil(reviewCount / limit),
    currentPage: +page,
  };
};

export const addReviewService = async (bookId, data, user) => {
  // Check is book exist
  const book = await Book.findById(bookId);
  if (!book) {
    throw new Error('Book not found');
  }
  // check is book already reviwed by the user
  const existingReview = await Review.findOne({ book: bookId, user: user._id });
  if (existingReview) {
    throw new Error('You have already reviewed this book');
  }

  const review = new Review({
    ...data,
    book: bookId,
    user: user._id,
  });

  return await review.save();
};
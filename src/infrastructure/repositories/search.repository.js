import Book from '../../domain/models/book.model.js';

export const searchBooks = async (query) => {
  const regex = new RegExp(query, 'i'); // case-insensitive
  return await Book.find({
    $or: [{ title: regex }, { author: regex }],
  }).sort({ createdAt: -1 });
};
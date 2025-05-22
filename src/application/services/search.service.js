import Book from '../../domain/models/book.model.js';

export const searchBooksService = async (query) => {
  if (!query || query.trim() === '') {
    throw new Error('Search query is required');
  }

  const regex = new RegExp(query, 'i'); // case-insensitive and partial match

  const results = await Book.find({
    $or: [{ title: regex }, { author: regex }],
  }).sort({ createdAt: -1 });

  return results;
};
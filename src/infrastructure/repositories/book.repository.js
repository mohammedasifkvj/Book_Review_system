import Book from '../../domain/models/book.model.js';

export const createBook = async (bookData) => {
  return await Book.create(bookData);
};

export const getBooks = async (filter = {}, page = 1, limit = 10) => {
  const skip = (page - 1) * limit;
  const books = await Book.find(filter)
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);
  const total = await Book.countDocuments(filter);
  return { books, total };
};

export const getBookById = async (id) => {
  return await Book.findById(id);
};
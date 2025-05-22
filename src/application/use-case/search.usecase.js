import { searchBooks } from '../../infrastructure/repositories/search.repository.js';

export const searchBooksByTitleOrAuthor = async (query) => {
  return await searchBooks(query);
};
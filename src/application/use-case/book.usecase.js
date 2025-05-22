import {
    createBook,
    getBooks,
    getBookById
  } from '../../infrastructure/repositories/book.repository.js';
  import { calculateAverageRating, getReviewsByBookId } from '../../infrastructure/repositories/review.repository.js';
  
  export const addBook = async (bookData) => {
    return await createBook(bookData);
  };
  
  export const listBooks = async (filters, page, limit) => {
    return await getBooks(filters, page, limit);
  };
  
  export const getBookDetails = async (bookId, page, limit) => {
    const book = await getBookById(bookId);
    if (!book) throw new Error('Book not found');
  
    const avgRating = await calculateAverageRating(bookId);
    const { reviews, total } = await getReviewsByBookId(bookId, page, limit);
  
    return {
      book,
      averageRating: avgRating,
      reviews,
      totalReviews: total,
    };
  };
  
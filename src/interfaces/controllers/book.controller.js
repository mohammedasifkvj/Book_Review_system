import {
    addBookService,
    getAllBooksService,
    getBookByIdService,
    addReviewService
  } from '../../application/services/book.service.js';
  
  export const addBookController = async (req, res) => {
    try {
      const book = await addBookService(req.body, req.user);
      res.status(201).json(book);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };
  
  export const getAllBooksController = async (req, res) => {
    try {
      const books = await getAllBooksService(req.query);
      res.json(books);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  export const getBookByIdController = async (req, res) => {
    try {
      const result = await getBookByIdService(req.params.id, req.query.page);
      res.json(result);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  };
  
  export const addReviewController = async (req, res) => {
    try {
      const review = await addReviewService(req.params.id, req.body, req.user);
      res.status(201).json(review);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };  
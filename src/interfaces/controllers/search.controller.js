import { searchBooksService } from '../../application/services/search.service.js';

export const searchBooksController = async (req, res) => {
  try {
    const books = await searchBooksService(req.query.q);
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
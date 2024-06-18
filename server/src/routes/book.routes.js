import express from 'express';
// import { getAllBooks,getBooks,createBook } from '../controllers/books.controller.js';
import { getBooks, createBook, getAllBooks } from '../controllers/books.controller.js';
import authenticate from '../middlewares/auth.middleware.js';
import { validateBookRegistration} from '../validators/book.validate.js';
const router = express.Router();


router.get("/",getBooks);
router.get("/all",getAllBooks);
router.post("/register", validateBookRegistration, createBook)

export default router;


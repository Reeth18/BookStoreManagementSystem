const express = require ('express');
const bookRouter = express.Router();

// Importing the book controller
const {
    addBook,
    getAllBooks,
    getBookById,
    updateBook,
    deleteBookById,
    searchBooksByTitle,
    reviewBook
} = require ('../Controllers/books.controller');

const jwtVerify = require ('../Middlewares/jwt.middleware');

// Add Book- Endpoint: `POST /books`
bookRouter.post('/addBook', jwtVerify, addBook);

// Get All Books   - Endpoint: `GET /books`
bookRouter.get('/getBook', jwtVerify, getAllBooks);

// Get Single Book   - Endpoint: `GET /books/:bookId`
bookRouter.get('/getBook/:id', jwtVerify, getBookById);

// Update Book   - Endpoint: `PUT /books/:bookId`
bookRouter.put('/updateBook/:id', jwtVerify, updateBook);

// Delete Book   - Endpoint: `DELETE /books/:bookId`
bookRouter.delete('/deleteBook/:id', jwtVerify, deleteBookById);

// Search Books   - Endpoint: `GET /books/search?query=BookTitle`
bookRouter.get('/search', jwtVerify, searchBooksByTitle);

// Add Review to Book   - Endpoint: `POST /books/:bookId/reviews`
bookRouter.post('/review/:id', jwtVerify, reviewBook);

// export the router
module.exports = bookRouter;
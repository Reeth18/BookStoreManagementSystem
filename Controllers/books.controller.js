// Importing the Book Model
const bookModel = require ('../Models/books.model');
const reviewModel = require ('../Models/review.model');

// Add Book- Endpoint: `POST /books`
const addBook = async (request, response) => {
    try {
        // Requesting the book schema
        let {
            title,
            author,
            isbn,
            price,
            quantity
        } = request.body;

        // Creating the new Book
        const addNewBook = new bookModel({
            Title: title,
            Author: author,
            ISBN: isbn,
            Price: price,
            Quantity: quantity,
        });

        // Saving the book data
        let saveAddedNewBook = await addNewBook.save();

        // If the book could not be added
        if (!saveAddedNewBook){
            return response.status(400).json({
                success: false,
                message: `Book could not be inserted successfully`
            });
        };

        // When the book is added successfully
        return response.status(200).json({
                success: true,
                message: `New Book added successfully`,
                bookId : saveAddedNewBook._id,
        });
    } catch (error) {
        // Error
        return response.status(401).json({
            success: false,
            message: `Error adding a new book.....${error.message}`,
        });
    }
}

// Get All Books   - Endpoint: `GET /books`
const getAllBooks = async (request, response) => {
    try {
        // Get the list of books
        const getBooks = await bookModel.find({});

        // If there is no book means the length is < 1
        // Return no books found
        if (getBooks.length < 1){
            return response.status(400).json({
                success: false,
                message: `No book found`
            })
        }

        // Return the list of books
        return response.status(200).json({
            success: true,
            message: "List of Books returned are",
            books: getBooks
        })
    } catch (error) {
        // Error
        return response.status(400).json({
            success: false,
            message: `Failed to retrieve the list of books.....${error.message}`
        })

    }
};

// Get Single Book   - Endpoint: `GET /books/:bookId`
const getBookById = async (request, response) => {
    // request the id
    let {id} = request.params;
    try {

        // get the details of the book based on id
        const getSingleBookByID = await bookModel.findById(
            {
                _id:id,
            }
        );

        // if no book is there return no book found
        if (!getSingleBookByID){
            return response.status(400).json({
                success: false,
                message: `No Book is found in the database with this ID`
            });
        };

        // Else return the book
        return response.status(200).json({
            success: true,
            message: `Book Found`,
            book: getSingleBookByID
        });
    } catch (error) {
        // Error
        return response.status(400).json({
            success: false,
            message: `Book Data could not be retrieved.....${error.message}`
        });
    }
}

// Update Book   - Endpoint: `PUT /books/:bookId`
const updateBook = async (request, response) => {
    let {id} = request.params;
    try {
        // Requesting the title and the Price of the book which are to be updated
        const {
            title,
            price,
        } = request.body;

        // Update the book by id
        const updateBookByID = await bookModel.findByIdAndUpdate(
            {
                _id: id,
            },
            {
                Title: title,
                Price: price
            },
            {
                new: true
            }
        );
        
        // If the profile is not updated, return not updated
        if(!updateBookByID){
            return response.status(400).json({
                success: false,
                message: `Not Updated`
            })
        }

        // Return the book just updated
        return response.status(200).json({
            succes: true,
            message: `Book Updated Successfully`,
            book: updateBookByID
        })
    } catch (error) {
        // Error
        return response.status(400).json({
            success: false,
            message: `Could Not Update a book..... ${error.message}`
        })
    }
};

// Delete Book   - Endpoint: `DELETE /books/:bookId`
const deleteBookById = async (request, response) => {
    let {id} = request.params;
    try {
        // Delete operation is also done by ID
        const deleteBook = await bookModel.findByIdAndDelete(
            {
                _id: id,
            }
        );

        // If the book is not matched return no need to delete
        if (!deleteBook){
            return response.status(400).json({
                succes: false,
                message: `ID not matched.....Hence no need to delete`
            })
        }

        // Else delete the book
        return response.status(200).json({
            succes: true,
            message: `ID matched.....Book Deleted Successfully`
        })
    } catch (error) {
        // Error
        return response.status(400).json({
            success: false,
            message: `Could Not Delete the book..... ${error.message}`
        })
    }
}

// Search Books   - Endpoint: `GET /books/search?query=BookTitle`
const searchBooksByTitle = async (request, response) => {
    let {query} = request.query;
    try {
        // use a case insensitive regular expression to search for books by title
        const searchBook = await bookModel.find({
            Title: {
                $regex: new RegExp(query, 'i'),
            }
        })

        // If the searched book is not matched
        if (!searchBook){
            return response.status(400).json({
                success: false,
                message: `Book cannot be searched out`
            })
        }

        // Return the searched book
        return response.status(200).json({
            success: true,
            message: `Book searched out`,
            Book: searchBook
        })
    } catch (error) {
        // Error
        return response.status(400).json({
            success: false,
            message: `Error in searching the book.....${error.message}`
        })
    }
}

// Add Review to Book - Endpoint: `POST /books/:bookId/reviews`
const reviewBook = async (request, response) => {
    try {
        let {bookId} = request.params;
        let {
            comment,
            rating
        } = request.body;

        // Find the book based on its id
        const findBook = await bookModel.findById(
            {
                _id: bookId,
            }
        );

        // if the book has no existence
        if (! findBook){
            return response.status(401).json({
                success: false,
                message:`Book Not Found`
            });
        }

        // else create a new review
        const review = new reviewModel({
            comments: comment,
            rating: rating,
            book: bookId
        });

        // Save the review
        const saveReview = await review.save();

        // Return the message
        return response.status(200).json({
            success: true,
            message: `Book Review Updated`,
            saveReview
        })
    } catch (error) {
        // Log the error
        return response.status(400).json({
            success: false,
            message:`Book Review could not be added ......${error.message}`
        });
    }
}

// Export the controller
module.exports = {
    addBook,
    getAllBooks,
    getBookById,
    updateBook,   
    deleteBookById,
    searchBooksByTitle,
    reviewBook
}
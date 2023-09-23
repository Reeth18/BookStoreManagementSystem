const User = require("../Models/user.model");
const Book = require("../Models/books.model");
const Cart = require("../Models/cart.model");


// const validObjectId = new mongoose.Types.ObjectId();

const createCart = async (req, res) => {
    try {
        const { user } = req.body;
        const cart = new Cart({
            user: user
        })
        const cartCreated = await cart.save();
        return res.status(200).json({
            message: "Cart Created Successfully",
            cartCreated
        })



    } catch (error) {
        console.log("Something Went Worng  while creating cart", error);

        res.status(500).json({
            message: `Error Creating Cart ${error.message}`
        })
    }
}

// Add Book to Cart- Endpoint: `POST /cart`
const addToCart = async (req, res) => {
    try {
        const { cartId, userId, bookId, quantity } = req.body;

        // console.log(userId,bookId,quantity);

        const cart = await Cart.findById({ _id: cartId });

        const book = await Book.findById({ _id: bookId });

        // Check if the book with the given bookIdToCheck already exists in the cart
        // Find the index of the book in the cart
        const bookIndex = cart.books.findIndex(bookItem => bookItem.bookId.toString() === bookId.toString());
        const qty = parseInt(quantity);
        const bookPrice = parseInt(book.Price);

        if (!cart) {
            return res.status(400).json({
                message: "Cart not Found"
            })
        }

        if (!book) {
            return res.status(400).json({
                message: "Book not Found"
            })
        }

        if (bookIndex == -1) {
            cart.books.push({

                bookId: bookId,
                quantity: qty,
                price: bookPrice,
                totalPrice: (bookPrice * qty)

            });
            cart.totalItems += qty;
            cart.totalPrice += (bookPrice * qty);
            let cartAdded = await cart.save();
            res.status(200).json({
                success: true,
                message: 'Item added to cart successfully',
                cartAdded
            });
        } else {
            //if book index is not -1 than book already exisit in the cart 
            // update the qunatity and total price and save the document

            cart.books[bookIndex].quantity += qty;
            cart.books[bookIndex].totalPrice = cart.books[bookIndex].price * cart.books[bookIndex].quantity;

            //updateing totalPrice and totalItems in the cart
            // cart.totalItems += parseInt(cart.books[bookIndex].qty);
            cart.totalPrice += bookPrice * qty;

            //save the cart
            const savedCart = await cart.save();
            res.status(200).json({
                message: "Successfully updated book quantity",
                savedCart
            });
        }


    } catch (error) {
        console.log("Something Went Worng  while adding item to cart", error);
        res.status(500).json({
            message: `Error adding item to Cart ${error.message}`
        })
    }
}

// Get Cart Contents
// Get Cart Contents   - Endpoint: `GET /cart`
const getCartContents = async (req, res) => {
    try {
        const getAllCart = await Cart.find({});
        if (!getAllCart) {
            return res.status(400).json({
                message: "Cart is Empty"
            });
        }

        return res.status(200).json({
            message: "Cart Found",
            cart: getAllCart
        })

    } catch (error) {
        console.log("Something Went Worng  while getting all carts", error);
        res.status(500).json({
            message: `Error getting Carts ${error.message}`
        })
    }
}

// Export controllers
module.exports = {
  createCart,
  addToCart,
  getCartContents,
};

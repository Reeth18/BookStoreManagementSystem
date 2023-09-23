const express = require ('express');
const cartRouter = express.Router();
const jwtVerify = require ('../Middlewares/jwt.middleware');

// Import the cart controller
const {
    createCart,
    addToCart,
    getCartContents
} = require ('../Controllers/cart.controller');

// Create Cart
cartRouter.post('/createCart', jwtVerify, createCart);

// Add Book to Cart- Endpoint: `POST /cart`
cartRouter.post('/addToCart', jwtVerify, addToCart);

// Get Cart Contents   - Endpoint: `GET /cart`
cartRouter.get('/getCart', jwtVerify, getCartContents);

// Export the custom Router
module.exports = cartRouter;
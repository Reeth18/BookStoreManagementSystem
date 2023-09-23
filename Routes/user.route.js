const express = require ('express');
const userRouter = express.Router();
// Importing the Controllers
const {
    signup,
    signin,
    getAllUsers,
    updateUser
} = require ('../Controllers/user.controller');

// Importing the middleware
const jwtVerify = require ('../Middlewares/jwt.middleware');

// Sign Up - Endpoint: `POST /users/signup`
// API for signup
userRouter.post('/signup', signup);

// Sign In - Endpoint: `POST /users/signin`
// API for signin
userRouter.post('/signin', signin);

// Profile View   - Endpoint: `GET /users/profile``
userRouter.get('/get-profile', jwtVerify, getAllUsers);

// Profile Update   - Endpoint: `PUT /users/profile`
userRouter.put('/update-profile/:id', jwtVerify, updateUser);

// Export the router
module.exports = userRouter;

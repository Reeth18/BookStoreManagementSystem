const express = require ('express');
const morgan = require ('morgan');
const dotenv = require ('dotenv').config();

// Initiate the express library
const app = express();

// import the middleware json 
app.use(express.json());

// use morgan
app.use(morgan());


// import the router
// ***** Entry Point or Gateway to userRouter ***** //
const userRouter = require ('./Routes/user.route');
app.use('/users', userRouter)

// ***** Entry Point or Gateway to the bookRouter ***** //
const bookRouter = require ('./Routes/books.route');
app.use('/books', bookRouter);

// ***** Entry Point or Gateway to the cartRouter ***** //
const cartRouter = require ('./Routes/cart.route');
app.use('/cart', cartRouter);

// ***** Make the connection to the Database ***** //
const main = require ('./dbConnection');

main()
    // In case of successful connection
    .then(() => {
        console.log(`Database Connected Successfully`);
    })
    // Unsuccessful Connection report the error
    .catch((err) => {
        console.log(err);
    });

// ***** Running the Server ***** //
// Define the Port No
const portNo = process.env.portNo;

// ***** Start the Server ***** //
app.listen (portNo, () => {
    console.log(`Server is running on ${portNo}`);
})
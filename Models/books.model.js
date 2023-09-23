const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Creating the Books Schema
const bookSchema = new Schema(
    {
        Title: {
            type: String,
            required: true
        },
        Author: {
            type: String,
            required: true
        },
        ISBN: {
            type: String,
            required: true
        },
        Price: {
            type: Number,
            required: true
        },
        Quantity: {
            type: Number,
            required: true
        }
    }
);

// Exporting the Book Schema
module.exports = mongoose.model('BookSchema', bookSchema);

const mongoose = require ('mongoose');
const Schema = mongoose.Schema;

// Creating the User Schema

const userSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    }
},
{
    timestamps: true,
});

// Exporting the Model Schema
module.exports = mongoose.model('BookStoreUsers', userSchema);

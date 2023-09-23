const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cartSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'BookStoreUsers',
        required: true,
    },
    books: [
        {
            bookId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'BookSchema',
                required: true,
            },
         quantity: {
                type: Number,
                required: true,
            },
        
            price: {
                type: Number,
                required: true,
            },
            totalPrice: {
                type: Number,
                required: true,
            }
        }
    ],
    totalItems: {
        type: Number,
        default: 0,
    },
    totalPrice: {
        type: Number,
        default: 0,
    },
});

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;
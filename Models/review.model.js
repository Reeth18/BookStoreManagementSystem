const mongoose = require ('mongoose');
const Schema = mongoose.Schema;

// Creating the review schema
const reviewSchema = new Schema(
    {
        comments: {
            type: String,
            required: true,
        },
        rating: {
            type: Number,
            required: true,
            min: 1,
            max: 5
        },
        book: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'BookSchema',
            required: true,
        }
    }
)

// Exporting the schema
module.exports = mongoose.model('Review', reviewSchema);
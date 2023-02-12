const mongoose = require('mongoose');

const actionSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Title is required'],
        minLength: [4, 'Title should be at least 4 characters long'],
    },
    description: {
        type: String,
        maxLength: [200, 'Description should be no longer than 200 characters'],
    },
    category: {
        type: String,
        required: [true, 'Category is required'],
        enum: ['vehicles', 'estate', 'electronics', 'furniture', 'other'],
    },
    image: {
        type: String
    },
    price: {
        type: Number,
        required: [true, 'Price is required'],
        validate: {
            validator: function (value) {
                return value > 0;
            },
            message: 'Price should be positive number',
        },
    },
    author: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: [true, 'Author is required'],
    },
    bidder: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        default: null,
    }
});

const Action = mongoose.model('Action', actionSchema);

module.exports = Action;
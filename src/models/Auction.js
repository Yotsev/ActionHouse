const mongoose = require('mongoose');

const actionSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true,'Title is required'],
        minLength: [4, 'Title should be at least 4 characters long'],
    },
    description: {
        type: String,
        maxLength: [200, 'Ddescription should not be longer then 200 characters'],
    },
    category: {
        type: String,
        enum: {
            values:['vehicles', 'estate', 'electronics', 'furniture', 'other'],
            message: 'Invalid category'
        },
        required: [true,'Category is required'],
    },
    imageURL: {
        type: String,
    },
    price :{
        type: Number,
        required: [true,'Price is required'],
        min: [0,'Price must be a positive number'],
    },
    author: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: [true,'Category is required'],
    },
    bidder: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }
});

const Action = mongoose.model('Action', actionSchema);

module.exports = Action;
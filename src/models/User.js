const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true,'Email is rerequired'],
        validate: [/^[A-Za-z]+@[A-Za-z]+.[A-Za-z]+$/,'Email must contain only latin letters'],
    },
    firstName: {
        type: String,
        required: [true,'First name is rerequired'],
        minLength: [1, 'First name must be at least 1 characters long'],

    },
    lastName: {
        type: String,
        required: [true,'Last name is rerequired'],
        minLength: [1, 'Lirst name must be at least 1 characters long'],
    },
    password: {
        type: String,
        required: [true,'Password is rerequired'],
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
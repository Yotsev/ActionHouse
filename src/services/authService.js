const bcrypt = require('bcrypt');
const User = require('../models/User');
const jwt = require('../libs/jsonwebtoken');
const config = require('../configs/config');

exports.getUserByEmail = (email)=> User.findOne({email});

exports.getExistingUser = async (username, email) => {
    const existingUser = await User.findOne({$or: [{email}, {username}]});
    
    return existingUser;
};

exports.register = async (user) => {
    const passwordLenght = 5;

    const existingUser = await this.getUserByEmail(user.email);

    if (existingUser) {
        throw new Error('User exists');
    }

    if (user.password.length < passwordLenght) {
        throw new Error('Password must be at least 5 characters long');
    }

    if (user.password !== user.rePassword) {
        throw new Error('Password mismatch');
    }

    const hashedPassword = await bcrypt.hash(user.password, 10);

    await User.create({ ...user, password:hashedPassword });

    return this.login(user.email, user.password);
};

exports.login = async (email, password) => {
    const user = await this.getUserByEmail(email);

    if (!user) {
        throw new Error('Invalid email or password');
    }

    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
        throw new Error('Invalid email or password');
    }

    const payload = {
        _id: user._id,
        email,
        username: user.username,
    };

    const token = await jwt.sign(payload, config.SECRET);

    return token;
};
const Action = require('../models/Auction');

exports.getAll = () => Action.find({}).lean();

exports.publish = (userId, actionData) => Action.create({ ...actionData, author: userId });

exports.getOne = (actionId) => Action.findById(actionId).populate('author bidder').lean();

exports.edit = async (actionId, actionData) => Action.findByIdAndUpdate(actionId, actionData, {runValidators: true});

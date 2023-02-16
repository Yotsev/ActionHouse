const Action = require('../models/Auction');

exports.getAllActive = () => Action.find({isClosed:false}).lean();

exports.getAllInactive = () => Action.find({isClosed:true}).lean();

exports.publish = (userId, actionData) => Action.create({ ...actionData, author: userId });

exports.getOne = (actionId) => Action.findById(actionId).populate('author bidder').lean();

exports.edit = (actionId, actionData) => Action.findByIdAndUpdate(actionId, actionData, { runValidators: true });

exports.delete = (actionId) => Action.findByIdAndDelete(actionId);

exports.placeBid = async (actionId, bidderId, bid) => {
    const action = await Action.findById(actionId);

    action.bidder = bidderId;
    action.price = bid;

    await action.save();
}

exports.closeAction = async (actionId)=> Action.findByIdAndUpdate(actionId, {isClosed:true});
const Action = require('../models/Auction');

exports.getAll = ()=> Action.find({}).lean();

exports.publish = (userId, actionData)=> Action.create({...actionData, author: userId});
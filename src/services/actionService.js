const Action = require('../models/Auction');

exports.getAll = async ()=> Action.find({}).lean();
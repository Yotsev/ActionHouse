const Action = require('../models/Action');

exports.getAllAds = async()=> {
    const ads = await Action.find({}).lean();

    return ads;
};

exports.getAdById = async (id)=> {
    const ad = await Action.findById(id).populate('bidder').lean();

    return ad;
};

exports.publishAd = async (ad)=> {
    await Action.create(ad);
};
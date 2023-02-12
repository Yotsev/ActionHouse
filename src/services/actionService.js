const Action = require('../models/Action');

exports.getAllAds = async()=> {
    const ads = await Action.find({}).lean();

    return ads;
};

exports.publishAd = async (ad)=> {
    await Action.create(ad);
};
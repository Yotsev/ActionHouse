const actionRouter = require('express').Router();

const { isAuthenticated } = require('../middlewares/authMiddleware');
const actionService = require('../services/actionService');
const { parseError } = require('../utils/errorParser');

actionRouter.get('/browse', async (req, res) => {
    const ads = await actionService.getAllAds();
    const hasAds = ads.length > 0;


    res.render('action/browse', { ads, hasAds });
});

actionRouter.get('/publish', isAuthenticated, (req, res) => {
    res.render('action/create');
});

actionRouter.post('/publish', isAuthenticated, async (req, res) => {
    const ad = {
        title: req.body.title,
        description: req.body.description,
        category: req.body.category,
        image: req.body.image,
        price: req.body.price,
        author: req.user._id,
    };

    try {
        await actionService.publishAd(ad);
    } catch (err) {
        console.log(err);
        return res.status(400).render('action/create', { errors: parseError(err) })
    }

    res.redirect('/action/browse');
});

actionRouter.get('/:id/details', async (req, res) => {
    let isAuthor, isTopBidder;
    const ad = await actionService.getAdById(req.params.id);
    const isUser = req.user;

    if (isUser) {
        isAuthor = ad.author._id == req.user._id;
        isTopBidder = ad.bidder == req.user._id;
    }

    if (isAuthor) {
        return res.render('action/details-owner',);
    } else {

        return res.render('action/details', { isUser, isTopBidder, isTopBidder });
    }
});

module.exports = actionRouter;
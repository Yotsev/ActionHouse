const actionRouter = require('express').Router();

const { isAuthenticated } = require('../middlewares/authMiddleware');
const actionService = require('../services/actionService');
const { parseError } = require('../utils/errorParser');

actionRouter.get('/browse', (req, res) => {
    res.render('action/browse');
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
        return res.status(400).render('action/create', { errors: parseError(err) })
    }

    res.redirect('/action/browse');
});

module.exports = actionRouter;
const actionRouter = require('express').Router();

const { categoriesMap } = require('../constants');
const { isAuthenticated } = require('../middlewares/authMiddleware');
const actionService = require('../services/actionService');
const { getCategoriesViewData } = require('../utils/actionsUtils');
const { getErrorMessage } = require('../utils/errorParser');

actionRouter.get('/browse', async (req, res) => {
    const actions = await actionService.getAllActive();
    res.render('action/browse', { actions });
});

actionRouter.get('/publish', isAuthenticated, (req, res) => {
    const categories = getCategoriesViewData();

    res.render('action/create', { categories });
});

actionRouter.post('/publish', isAuthenticated, async (req, res) => {
    const actionData = req.body;
    const categories = getCategoriesViewData();

    try {
        await actionService.publish(req.user._id, actionData);
    } catch (err) {
        console.log(err);
        return res.status(400).render('action/create', { error: getErrorMessage(err), categories });
    }

    res.redirect('/action/browse');
});

actionRouter.get('/:actionId/details', async (req, res) => {
    let topBidder = false;

    const action = await actionService.getOne(req.params.actionId);
    action.category = categoriesMap[action.category];

    const isAuthor = action.author._id == req.user?._id;
    const bidder = action.bidder;

    if (isAuthor) {
        return res.render('action/details-owner', { action, bidder })
    }

    if (action.bidder?._id == req.user?._id) {
        topBidder = true;
    }

    res.render('action/details', { action, topBidder });
});

actionRouter.get('/:actionid/edit', isAuthenticated, async (req, res) => {
    const action = await actionService.getOne(req.params.actionid);
    const isAuthor = action.author._id == req.user._id;

    if (!isAuthor) {
        return res.redirect(`/`);
    }

    const categories = getCategoriesViewData(action.category);
    const hasBidder = Boolean(action.bidder);


    res.render('action/edit', { action, categories, hasBidder });
});

actionRouter.post('/:actionid/edit', isAuthenticated, async (req, res) => {
    const actionData = req.body;

    const action = await actionService.getOne(req.params.actionid);
    const categories = getCategoriesViewData(action.category);

    if (action.author._id != req.user._id) {
        return res.redirect('/');
    }

    try {
        await actionService.edit(req.params.actionid, actionData);
    } catch (err) {
        return res.status(400).render(`action/edit`, { action, categories, error: getErrorMessage(err) });
    }

    res.redirect(`/action/${req.params.actionid}/details`);
});

actionRouter.get('/:actionid/delete', isAuthenticated, async (req, res) => {
    const action = await actionService.getOne(req.params.actionid);

    if (action.author._id != req.user._id) {
        return res.redirect('/');
    }

    await actionService.delete(req.params.actionid);

    res.redirect('/action/browse');
});

actionRouter.post('/:actionId/bid', isAuthenticated, async (req, res) => {
    const action = await actionService.getOne(req.params.actionId);
    action.category = categoriesMap[action.category];

    const bid = req.body.bid

    try {
        if (action.author._id == req.user._id) {
            throw new Error(`Can't place bid on own action`);
        }

        if (action.price >= bid) {
            throw new Error(`Bid can't be lower or equal to current price`);
        }

        await actionService.placeBid(req.params.actionId, req.user._id, bid);

    } catch (err) {
        console.log(err);
        return res.status(400).render('action/details', { action, error: getErrorMessage(err) });
    };

    await actionService.placeBid(req.params.actionId, req.user._id, bid);

    res.redirect(`/action/${req.params.actionId}/details`);
});

actionRouter.get('/closed-actions', isAuthenticated, async (req, res) => {
    const actions = await actionService.getAllInactive();

    res.render('action/closed-auctions', { actions });
});

actionRouter.get('/:actionId/close', isAuthenticated, async (req, res)=> {
    const action = await actionService.getOne(req.params.actionId);

    if (action.author._id != req.user._id || !action.bidder) {
        return res.redirect('/');
    }
    
    await actionService.closeAction(req.params.actionId);

    res.redirect('/action/closed-actions');
});

module.exports = actionRouter;
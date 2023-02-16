const actionRouter = require('express').Router();

const { categoriesMap } = require('../constants');
const { isAuthenticated } = require('../middlewares/authMiddleware');
const actionService = require('../services/actionService');
const { getCategoriesViewData } = require('../utils/actionsUtils');
const { getErrorMessage } = require('../utils/errorParser');

actionRouter.get('/browse', async (req, res) => {
    const actions = await actionService.getAll();
    res.render('action/browse', { actions });
});

actionRouter.get('/publish', isAuthenticated, (req, res) => {
    const categories = getCategoriesViewData();

    res.render('action/create', { categories });
});

actionRouter.post('/publish', isAuthenticated, async (req, res) => {
    const actionData = req.body;
    const categories = getCategoriesViewData();

    console.log(actionData);

    try {
        await actionService.publish(req.user._id, actionData);
    } catch (err) {
        console.log(err);
        return res.status(400).render('action/create', { error: getErrorMessage(err), categories });
    }

    res.redirect('/action/browse');
});

actionRouter.get('/:actionId/details', async (req, res) => {
    const action = await actionService.getOne(req.params.actionId);
    action.category = categoriesMap[action.category];
   
    const isAuthor = action.author._id == req.user?._id;
    const hasBidder = action.bidder;
    
    if (isAuthor) {
        return res.render('action/details-owner', { action, hasBidder })
    }

    res.render('action/details', { action });
});

module.exports = actionRouter;
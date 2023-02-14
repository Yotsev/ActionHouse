const actionRouter = require('express').Router();

const { isAuthenticated } = require('../middlewares/authMiddleware');
const actionService = require('../services/actionService');

actionRouter.get('/browse', async (req, res)=> {
    const actions = await actionService.getAll(); 
        res.render('action/browse');
});

actionRouter.get('/publish', isAuthenticated, (req, res)=> {
    res.render('action/create');
});


module.exports = actionRouter;
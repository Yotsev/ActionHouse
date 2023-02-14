const actionRouter = require('express').Router();

actionRouter.get('/browse', (req, res)=> {
        res.render('action/browse');
});



module.exports = actionRouter;
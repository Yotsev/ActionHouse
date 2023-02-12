const homeRouter = require('express').Router();

//Get Home Page
homeRouter.get('/', (req, res)=> {
    res.render('home/index');
});

//Get 404 Page
homeRouter.get('/404', (req, res)=> {
    res.render('home/404');
});

module.exports = homeRouter;
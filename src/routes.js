const router = require('express').Router();

const { authentication } = require('./middlewares/authMiddleware');

const homeController = require('./controllers/homeController');
const authController = require('./controllers/authController');
const actionController = require('./controllers/actionController');

router.use('/', homeController);
router.use('/auth', authController);
router.use('/action', actionController);

module.exports = router;
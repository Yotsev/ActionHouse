const router = require('express').Router();

const { authentication } = require('./middlewares/authMiddleware');

const authController = require('./controllers/authController');
const homeController = require('./controllers/homeController');

router.use('/', homeController);
router.use('/auth', authController);

module.exports = router;
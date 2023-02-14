const router = require('express').Router();

const { authentication } = require('./middlewares/authMiddleware');

const authController = require('./controllers/authController');

router.use('/auth', authController);

module.exports = router;
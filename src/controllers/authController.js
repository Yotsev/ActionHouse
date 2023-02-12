const authController = require('express').Router();
const authService = require('../services/authService');
const { parseError } = require('../utils/errorParser');

//Get Register Page
authController.get('/register', (req, res) => {
    res.render('auth/register');
});

authController.post('/register', async (req, res) => {
    const user = {
        email: req.body.email,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        password: req.body.password,
        rePassword: req.body.rePassword,
    };

    console.log(user);
    try {
        const token = await authService.register(user);

        res.cookie('auth', token);
        res.redirect('/');
    } catch (err) {
        console.log(err);
        return res.status(400).render('auth/register', {error: parseError(err)});
    }
});

authController.get('/login', (req, res) => {
    res.render('auth/login');
});

authController.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const token = await authService.login(email, password);
        
        res.cookie('auth', token);
        res.redirect('/');
    } catch (err) {
        return res.status(404).render('auth/login', { error: getErrorMessage(err) });
    }
});

authController.get('/logout', (req, res) => {
    res.clearCookie('auth');
    res.redirect('/');
});

module.exports = authController;
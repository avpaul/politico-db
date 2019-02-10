const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
    res.render('home');
});
router.get('/signup', (req, res) => {
    res.render('signup');
});

router.get('/login', (req, res) => {
    res.render('login');
});

router.get('/reset', (req, res) => {
    res.render('/reset');
});

router.get('/profile', (req, res) => {
    res.render('userProfile');
});

module.exports = router;

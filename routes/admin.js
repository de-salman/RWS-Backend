const router = require('express').Router();
let Category = require('../models/category.model');


router.route('/').get((req, res) => {
    if (req.session.loggedIn) {
        res.render('index');
    }
    else {
        res.redirect('/login');
    }
})

router.route('/product').get((req, res) => {
    if (req.session.loggedIn) {
        Category.find().lean()
        .then(Category => res.render('product', { Category }))
        .catch(err => res.status(400).json('Error: ' + err));
    }
    else {
        res.redirect('/login');
    }
})

router.route('/category').get((req, res) => {
    if (req.session.loggedIn) {
        Category.find().lean()
            .then(Category => res.render('category', { Category }))
            .catch(err => res.status(400).json('Error: ' + err));
    }
    else {
        res.redirect('/login');
    }
})

module.exports = router;
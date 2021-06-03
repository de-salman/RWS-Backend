const router = require('express').Router();


router.route('/').get((req, res) => {
    res.render('login');
})

router.post('/', function (req, res, next) {

    // you might like to do a database look-up or something more scalable here
    if (req.body.username && req.body.username === 'user' && req.body.password && req.body.password === 'pass') {
        // req.session.authenticated = true;
        req.session.loggedIn = true
        req.session.username = req.body.username
        res.redirect('/admin');
    } else {
        res.redirect('/login');
    }

});


module.exports = router;
var express = require('express');
var router = express.Router();
const user = require('../db/users');
const middle = require('../middleware');

router.get('/', middle.loggedIn, function(req, res, next) {
    res.render('login', { title: 'Login'});
});

router.post('/', middle.loggedIn, function(req, res, next) {
    if( req.body.username && req.body.password ) {
        const username = req.body.username;
        const password = req.body.password;

        user.checkPassword( username, password, function( error, user ) {
            if( error || !user ) {
                res.send("Invalid password or username");
            } else {
                req.session.userId = user.user_id;
                res.redirect( '/' );
            }
        });
    } else {
        res.send('Missing required fields');
    }
});

module.exports = router;

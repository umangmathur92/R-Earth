var express = require('express');
var router = express.Router();
const user = require('../db/users');

router.get('/', function(req, res, next) {
    /*
    var login = {};
    if( req.session && req.session.userId ) {
        login.isLoggedIn = true;
    } else {
        login.isLoggedIn = false;
    }
    res.send(login);
    */
    res.render('login', { title: 'Login'});
});

router.post('/', function(req, res, next) {
    if (req.body.username && req.body.password) {
        const username = req.body.username;
        const password = req.body.password;

        user.checkPassword(username, password, function (error, user) {
           if (error || !user) {
               res.send("Invalid password or username");
           } else {
                req.session.userId = user.user_id;
                res.send({isLoggedIn: true});
            }
        });
    } else {
        res.send('Missing required fields');
    }
});

module.exports = router;

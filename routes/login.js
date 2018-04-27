var express = require('express');
var router = express.Router();
const user = require('../db/users');

/** Display login page if user is not already logged in*/
router.get('/', function(req, res, next) {
    var message = {title: 'Login'};
    if( req.session && req.session.userId ) { //Check for user login
        message.userId = req.session.userId;
    }
    res.render('login', message);
});

/** User authentication: check for correct username and password in order to login*/
router.post('/', function(req, res, next) {
    if (req.body.username && req.body.password) {
        const username = req.body.username;
        const password = req.body.password;

        user.checkPassword(username, password, function (error, user) { //Check for valid password
           if (error || !user) {
               res.send({error: "Invalid username or password"}); //Password incorrect or user does not exist
           } else {
                req.session.userId = user.user_id; //Create user session
                req.session.save()
                res.send({userId: req.session.userId});
            }
        });
    } else {
        res.send({});
    }
});

module.exports = router;

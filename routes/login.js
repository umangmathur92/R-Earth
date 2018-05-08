var express = require('express');
var router = express.Router();
const user = require('../db/users');

/** Display login page*/
router.get('/', function(req, res, next) {
    var message = { title: 'Login', message: null, userId: null, userType: null, page: 'login'};
    res.render( 'login' , message );
});

/** User authentication*/
router.post('/', function(req, res, next) {
    var userId = req.session.userId;
    var userType;
    if(req.session && userId) {
        var current = user.getUserById(userId);
        current.then(userInfo => {
            userType = userInfo.user_type;
        })
        .catch(error => {
            res.send({userId: userId, userType: userType, error: error});
        });
    }

    if (req.body.username && req.body.password) {
        const username = req.body.username;
        const password = req.body.password;

        user.checkPassword(username, password, function (error, user) { //Check for valid password
           if (error || !user) {
               res.send({userId: userId, userType: userType, error: "Invalid username or password"}); //Password incorrect or user does not exist
           } else {
                req.session.userId = user.user_id; //Create user session
				req.session.userType = user.user_type;
                req.session.save();
                res.redirect('/');
            }
        });
    } else {
        res.send({userId: userId, userType: userType, error: "Missing required fields to login"});
    }
});

module.exports = router;
var express = require('express');
var router = express.Router();
const user = require('../db/users');

/** Display login page*/
router.get('/', function(req, res, next) {
    var message = { title: 'Login', message: null, userId: null };
    res.render( 'login' , message );
});

/** User authentication*/
router.post('/', function(req, res, next) {
<<<<<<< HEAD
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
=======

    console.log(req.body);
>>>>>>> 77f9583df856a16a5af213c5327ce43f1125ebf2

    if (req.body.username && req.body.password) {
        const username = req.body.username;
        const password = req.body.password;

<<<<<<< HEAD
        user.checkPassword(username, password, function (error, user) { //Check for valid password
           if (error || !user) {
               res.send({userId: userId, userType: userType, error: "Invalid username or password"}); //Password incorrect or user does not exist
           } else {
                req.session.userId = user.user_id; //Create user session
                req.session.save();
                res.send({userId: user.user_id, userType: user.user_type});
            }
        });
    } else {
        res.send({userId: userId, userType: userType, error: "Missing required fields to login"});
=======
        user.checkPassword(username, password, function (error,user) { //Check for valid user
            //TODO - Display Success and Error messages before redirecting.
            if ( error || !user ) {
                //Password incorrect or user does not exist
               res.redirect( '/login' ); 
           } else {
                req.session.userId = user.user_id; //Create user session
                req.session.save( function( err ){
                    req.flash( 'message', 'Login Successful' )
                    if(req.session.previousPage === 'submit'){
                        res.redirect( '/submit' );
                    } else {
                        res.redirect( '/' );
                    }
                });
            }
        });
    } else {
        res.redirect( '/login' )
>>>>>>> 77f9583df856a16a5af213c5327ce43f1125ebf2
    }
});

module.exports = router;

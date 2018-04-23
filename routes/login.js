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
    if (req.body.username && req.body.password) {
        const username = req.body.username;
        const password = req.body.password;

        user.checkPassword(username, password, function (error,user) { //Check for valid user
            //TODO - Display Success and Error messages before redirecting.
            if ( error || !user ) {
                //Password incorrect or user does not exist
               res.redirect( '/login' ); 
           } else {
                req.session.userId = user.user_id; //Create user session
                req.session.save( function( err ){
                    req.flash( 'message', 'Login Successful' )
                    res.redirect( '/' );
                });
            }
        });
    } else {
        res.redirect( '/login' )
    }
});

module.exports = router;

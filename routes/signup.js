var express = require('express');
var router = express.Router();
const user = require('../db/users');

/** Display sign up page if user is not already logged in*/
router.get('/', function(req, res, next) {
    const userId = null; 
    var message = {title: 'Sign Up', };
    if( req.session && req.session.userId ) { //Check for user login
        message.userId = req.session.userId;
    }
   var message = {title: 'Sign Up',userId};
   res.render('signup', message);
});

/** Create new account with valid user information*/
router.post('/', (req, res, next) => {
    
    //response body
    var message = {
        user: null,
        redirect: null,
        error: null,
    };

    if(req.body.name && req.body.username && req.body.password && req.body.password_confirmation && req.body.user_type) {
        const username = req.body.username;
        const password = req.body.password;
        const confirmation = req.body.password_confirmation;
        const name = req.body.name;
        const userType = req.body.user_type;
        const agency = req.body.agency;

        if(confirmation != password) {
            message.error = "There was an error signing up. We apologize. Please try again."
        } else {
            const exists = user.getUser(username);
            exists.then(data => {
                if(data == null){ //Check if username already exists
                    user.signUp(name, username, password, userType, agency, function(error, user) { //Create new account
                        if(error || !user) {
                            res.send('Error creating account');
                        } else {
                            req.session.userId = user.user_id; //Create user session
                            req.session.save( function( err ){
                                message.user = user
                                if(req.session.previousPage === 'submit'){
                                    message.redirect = '/submit';
                                } else {
                                    message.redirect = '/';
                                }
                                res.send(message)
                            });
                        }
                    });
                } else {
                    message.error = 'That username already exists! Trying adding a number at the end of ' + username + '.';
                    console.log(message)
                    res.send(message)
                }
            });
        }
    } else{
        message.error =  message.error = 'There was an error signing up. We apologize. Please try again.';
        res.send(message)
    }
});

module.exports = router;

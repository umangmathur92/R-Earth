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
    console.log(req.body)

    if(req.body.name && req.body.username && req.body.password && req.body.password_confirmation && req.body.user_type) {
        const username = req.body.username;
        const password = req.body.password;
        const confirmation = req.body.password_confirmation;
        const name = req.body.name;
        const userType = req.body.user_type;
        const agency = req.body.agency;

        if(confirmation != password) {
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
                                req.flash( 'message', 'Login Successful' )
                                res.redirect( '/' );
                            });
                        }
                    });
                } else {
                    res.send('Username already exists');
                }
            });
        }
    } else{
        res.send("Missing required fields");
    }
});

module.exports = router;

var express = require('express');
var router = express.Router();
const user = require('../db/users');

/** Display sign up page if user is not already logged in*/
router.get('/', function(req, res, next) {
    var message = {title: 'Sign Up', message: null, userId: null, userType: null, page: 'login'};
    if( req.session && req.session.userId ) { //Check for user login
        message.userId = req.session.userId;
    }
   res.render('signup', message);
});

/** Create new account with valid user information*/
router.post('/', (req, res, next) => {
    if(req.body.name && req.body.username && req.body.password && req.body.password_confirmation && req.body.user_type) {
        const username = req.body.username;
        const password = req.body.password;
        const confirmation = req.body.password_confirmation;
        const name = req.body.name;
        const userType = req.body.user_type;
        const agency = req.body.agency;

        if(confirmation != password) {
			message = { title: 'Error', message: null, userId: null, userType: null, error: 'Passwords do not match'};
			res.render('error', message);
        } else {
            const exists = user.getUser(username);
            exists.then(data => {
                if(data == null){ //Check if username already exists
                    user.signUp(name, username, password, userType, agency, function(error, user) { //Create new account
                        if(error || !user) {
							message = { title: 'Error', message: null, userId: null, userType: null, error: 'Internal Error Creating Account'};
							res.render('error', message);
                        } else {
                            req.session.userId = user.user_id; //Create user session
                            req.session.save();
                            res.send();
                            //res.redirect('/');
                        }
                    });
                } else {
					message = { title: 'Error', message: null, userId: null, userType: null, error: 'Username already exists'};
					res.render('error', message);
                }
            });
        }
    } else{
		message = { title: 'Error', message: null, userId: null, userType: null, error: "Missing required fields"};
		res.render('error', message);
    }
});

module.exports = router;
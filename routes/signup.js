var express = require('express');
var router = express.Router();
const user = require('../db/users');

/** Display sign up page if user is not already logged in*/
router.get('/', function(req, res, next) {
    var message = {title: 'Sign Up'};
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
            res.send({userId: null, userType: null, error: 'Passwords do not match'});
        } else {
            const exists = user.getUser(username);
            exists.then(data => {
                if(data == null){ //Check if username already exists
                    user.signUp(name, username, password, userType, agency, function(error, user) { //Create new account
                        if(error || !user) {
                            res.send({userId: null, userType: null, error: 'Internal Error Creating Account'});
                        } else {
                            req.session.userId = user.user_id; //Create user session
                            res.send({userId: user.user_id, userType: user.user_type});
                        }
                    })
                    .catch(error => {
                        res.send({userId: null, userType: null, error:error});
                    });
                } else {
                    res.send({userId: null, userType: null, error: 'Username already exists'});
                }
            }).
            catch(error => {
                res.send({userId: null, userType: null, error:error});
            });
        }
    } else{
        res.send({userId: null, userType: null, error: "Missing required fields"});
    }
});

module.exports = router;

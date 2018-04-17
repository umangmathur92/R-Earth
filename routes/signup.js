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
    res.render('signup', { title: 'Sign Up'});
});

router.post('/', (req, res, next) => {
    if(req.body.name && req.body.username && req.body.password && req.body.password_confirmation && req.body.user_type) {
        const username = req.body.username;
        const password = req.body.password;
        const confirmation = req.body.password_confirmation;
        const name = req.body.name;
        const userType = req.body.user_type;
        const agency = req.body.agency;

        if(confirmation != password) {
            res.send('Passwords do not match');
        } else {
            const exists = user.getUser(username);
            exists.then(data => {
                if(data == null){
                    user.signUp(name, username, password, userType, agency, function(error, user) {
                        if(error || !user) {
                            res.send('Error creating account');
                        } else {
                            req.session.userId = user.user_id;
                            res.send({isLoggedIn: true});
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

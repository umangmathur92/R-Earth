var express = require('express');
var router = express.Router();
const listing = require('../db/listing');
const user = require('../db/users');

//display dashboard if user is signed in
router.get('/', function(req, res, next) {
  var message = {title: 'R-Earth', userId: null};
  if( req.session && req.session.userId ) { //Check for user login
     message.userId = req.session.userId;
  }
  res.render('dashboard', message);
});


/** Create new listing with user information*/
router.post('/', function(req, res, next) {
    var login = {};
    if( req.session && req.session.userId ) { //Check for user login and type
        login.userId = req.session.userId;
        const current = user.getUserById(req.session.userId);
            current.then( userInfo => {
                login.userType = userInfo.user_type;
            res.send(login);
        });
    } else {
        res.send(login);
    }
});




module.exports = router;


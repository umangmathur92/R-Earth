var express = require('express');
var router = express.Router();
const listing = require('../db/listing');
var cloudinary = require('cloudinary');
const user = require('../db/users');

/** Display submission page (create new listing) if user is logged in */
router.get('/', function(req, res, next) {
  var message = {title: 'R-Earth'};
  if( req.session && req.session.userId ) { //Check for user login
     message.userId = req.session.userId;
  }
  res.render('submit', message);
});


/** Create new listing with user information*/
router.post('/', function(req, res, next) {
    const user_id = req.session.userId;
    const title = req.body.title;
    const picture = req.body.picture;
    const description = req.body.description;
    const longitude = req.body.longitude;
    const latitude = req.body.latitude;
    const address = req.body.address;
    const zipcode = req.body.zipcode;
    const category = req.body.category;
    listing.createListing(user_id, title, picture, description, longitude, latitude, address, zipcode, category); //Create new listing
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

/** Respond to existing listing if user is an authorized environmental agent*/
router.post('/respond', function(req, res, next) {
    const listingId = req.body.listingId;
    const status = req.body.status;
    const description = req.body.description;
    const agency = req.body.agency;
    listing.updateResponse(listingId, status, description, agency); //Add response information to listing
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


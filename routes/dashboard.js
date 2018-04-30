var express = require('express');
var router = express.Router();
const listing = require('../db/listing');
const user = require('../db/users');
var cloudinary = require('cloudinary');

cloudinary.config({
   cloud_name: 'csc648team01',
   api_key: '532321131662413',
   api_secret: 'RqHswX8LkdYsslb5VX_74AEMckg'
});

/** Display submission page (create new listing) if user is logged in */
router.get('/', function(req, res, next) {
  var message = {title: 'R-Earth', userId: null};
  if( req.session && req.session.userId ) { //Check for user login
     message.userId = req.session.userId;
  }
  res.render('dashboard', message);
});


/** Create new listing with user information*/
router.post('/', function(req, res, next) {
    //const user_id = req.session.userId;
    const user_id = 1;
    const title = req.body.title;
    const description = req.body.description;
    const longitude = req.body.longitude;
    const latitude = req.body.latitude;
    const address = req.body.address;
    const zipcode = req.body.zipcode;
    const category = req.body.category;
    const base64 = req.body.picture;

    cloudinary.uploader.upload(base64, function(result) { // Upload image to cloudinary
        const picture = result.public_id;
        listing.createListing(user_id, title, picture, description, longitude, latitude, address, zipcode, category); //Create new listing
    });
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

function upload(base64) {
    return cloudinary.uploader.upload(base64, function(result) {
        console.log(result);
        return result.public_id;
    });
}

module.exports = router;


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
  console.log(req.session)
  if( req.session && req.session.userId ) { //Check for user login
     message.userId = req.session.userId;
     res.render('submit', message);
  } else {
      req.session.previousPage = 'submit';
      req.session.save(function(error){
        res.render('signup', message);
      });
  }
});

/** Create new listing with user information*/
router.post('/', function(req, res, next) {
    const user_id = req.session.userId;
    var userType;
    if(req.session && userId) {
        var current = user.getUserById(userId);
        current.then(userInfo => {
            userType = userInfo.user_type;
        })
        .catch(error => {
            res.send({userId: userId, userType: userType, error: error});
        });
    } else{
        res.send({userId: userId, userType: userType, error: "User must be logged in to submit a listing"});
    }
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
            current
                .then( userInfo => {
                    login.userType = userInfo.user_type;
                    return login;
                })
                .then( login => {
                    const listings = fetchListings(1)
                    .then(data => {
                        console.log(data)
                        res.render('index', {title: 'R-Earth', listings: data})
                        res.redirect( '/' );
                    })
                })
                .catch(error => {

                })
    } else {
        res.send({userId: userId, userType: userType, error: "Missing fields required to submit a listing"});
    }
});

function upload(base64) {
    return cloudinary.uploader.upload(base64, function(result) {
        console.log(result);
        return result.public_id;
    });
}

module.exports = router;


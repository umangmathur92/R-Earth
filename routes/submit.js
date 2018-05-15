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
  var message = {title: 'R-Earth', userId: null, userType: null, page: 'submit'};
  if( req.session && req.session.userId ) { //Check for user login
     message.userId = req.session.userId;
	 message.userType = req.session.userType;
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
    const userId = req.session.userId;
    var userType = req.session.userType;

    if(req.session && userId) {
        var current = user.getUserById(userId);
        current.then(userInfo => {
            userType = userInfo.user_type;

            const title = req.body.title;
            const description = req.body.description;
            const longitude = req.body.longitude;
            const latitude = req.body.latitude;
            const address = req.body.address;
            const zipcode = req.body.zipcode;
            const category = req.body.category;
            const base64 = req.body.picture;

            if(userId && title && description && longitude && latitude && address && zipcode && category && base64) {
                cloudinary.uploader.upload(base64, function(result) { // Upload image to cloudinary
                    const picture = result.public_id;
                    var newListing = listing.createListing(userId, title, picture, description, longitude, latitude, address, zipcode, category); //Create new listing
                    newListing.catch(error => {
                        res.send({userId: userId, userType: userType, error:error});
                    });
                    res.send({status: "success"});
                    //res.redirect('/');
                });

            } else {
                message = { title: 'Error', message: null, userId: userId, userType: userType, error: "Missing fields required to submit a listing"};
                res.render('error', message);
            }
        })
        .catch(error => {
			message = { title: 'Error', message: null, userId: userId, userType: userType, error: error};
			res.render('error', message);
            //res.send({userId: userId, userType: userType, error: error});
        });
    } else{
		message = { title: 'Error', message: null, userId: null, userType: null, error: "User must be logged in to submit a listing"};
		res.render('error', message);
    }
});

function upload(base64) {
    return cloudinary.uploader.upload(base64, function(result) {
        return result.public_id;
    });
}

module.exports = router;

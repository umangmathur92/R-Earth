var express = require('express');
var router = express.Router();
const listing = require( '../db/listing' );
const user = require('../db/users');
var cloudinary = require('cloudinary');

cloudinary.config({
    cloud_name: 'csc648team01',
    api_key: '532321131662413',
    api_secret: 'RqHswX8LkdYsslb5VX_74AEMckg'
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('displaylisting');
});

router.get('/:listingId', function(req, res, next) {
  var userId = req.session.userId;
  var userType;
  if(req.session && userId) {
      var current = user.getUserById(userId);
      current.then(userInfo => {
          userType = userInfo.user_type;
      })
      .catch(error => {
          res.send({userId: userId, userType: userType, error: error});
      });
  }

  const listingId = req.params.listingId;
  if(!listingId) {
      res.send({userId: userId, userType: userType, error: "No listing ID specified"})
  }
  var currentListing = listing.getListingById(listingId);
  currentListing.then( data => {
    var publicId = data.picture;
    var full = getFullImage(publicId);
    data.picture = full;
    var userId = data.user_id;
    var postUser = user.getUserById(userId);
    postUser.then( userData => {
      data.username = userData.username;
      res.render('displaylisting', {userId: userId, userType: userType, data: data});
    })
    .catch(error => {
      res.send({userId: userId, userType: userType, error: error});
    });
  })
  .catch(error => {
    res.send({userId: userId, userType: userType, error: error});
  });
});

/** Generate full sized image*/
function getFullImage(publicId) {
    var url = cloudinary.url(publicId, {width: 500, height: 375, crop: 'fill'});
    return url;
}

module.exports = router;
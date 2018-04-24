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
  console.log('i was callllledd');
  res.render('displaylisting');
});

router.get('/:listingId', function(req, res, next) {
  const listingId = req.params.listingId;
  var currentListing = listing.getListingById(listingId);
  currentListing.then( data => {
    var publicId = data.picture;
    var full = getFullImage(publicId);
    data.picture = full;
    var userId = data.user_id;
    var postUser = user.getUserById(userId);
    postUser.then( userData => {
      data.username = userData.username;
      res.render('displaylisting', {data: data});
    //res.send(data);
    });
  });
});

/** Generate full sized image*/
function getFullImage(publicId) {
    var url = cloudinary.url(publicId, {width: 500, height: 375, crop: 'fill'});
    return url;
}

module.exports = router;
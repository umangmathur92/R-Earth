var express = require('express');
var router = express.Router();
const listing = require( '../db/listing' );

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log('i was callllledd');
  res.render('displaylisting');
});

router.get('/:listingId', function(req, res, next) {
  const listingId = req.params.listingId;
  var currentListing = listing.getListingById(listingId);
  currentListing.then( data => {
    res.render('displaylisting', {
      data: data});
  });
});

module.exports = router;
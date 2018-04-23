var express = require('express');
var router = express.Router();
const listing = require( '../db/listing' );

/* GET home page. */
router.get('/', function(req, res, next) {
  const listings = listing.fetchListings(1);
  
    listings.then( data => { 
        console.log(data);
        const { userId } = req.session
        console.log(req.session.userId)
        res.render('index', { title: 'R-Earth', listings: data, userId: userId ? userId : null});
    });
});

module.exports = router;



var express = require('express');
var router = express.Router();
const listing = require( '../db/listing' );

/* GET home page. */
router.get('/', function(req, res, next) {
  const listings = listing.fetchListings(1);
    listings.then( data => { 
        const userId  = req.session.userId; 
        console.log(req.session.userId)
        res.render('index', { title: 'R-Earth', userId: userId ? userId : null});
    });
});

module.exports = router;



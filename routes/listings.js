var express = require('express');
var router = express.Router();
const listing = require( '../db/listing' );
const middle = require('../middleware');

router.get('/', function(req, res, next) {
    const listings = listing.fetchListings();
    listings.then( data => { 
        res.send(data);
    });
});

router.post('/search/', function(req, res, next) {
    const key = req.body.key;
    const status = req.body.status;
    const category = req.body.category;
    const order = req.body.order;

    const results = listing.determineSearch(key, status, category, order);
    results.then( data => {
        if(data.length) {
            res.send(data);
         } else {
            const message = "No results found";
        }
    });
});


module.exports = router;
